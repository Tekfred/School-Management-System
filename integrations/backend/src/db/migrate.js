import { readdir, readFile } from 'node:fs/promises'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pool } from '../config/database.js'

const here = dirname(fileURLToPath(import.meta.url))
const dbRoot = join(here, '../../db')
const featureOrder = ['core', 'identity', 'academic', 'faculty', 'finance']

async function listSqlFiles(root, feature) {
  const folder = join(root, feature)
  const files = await readdir(folder, { withFileTypes: true }).catch(() => [])
  return files.filter((entry) => entry.isFile() && entry.name.endsWith('.sql'))
    .map((entry) => join(folder, entry.name)).sort()
}

async function runTrackedFiles(kind, trackingTable) {
  for (const feature of featureOrder) {
    for (const file of await listSqlFiles(join(dbRoot, kind), feature)) {
      const key = relative(join(dbRoot, kind), file).replaceAll('\\', '/')
      const existing = await pool.query(`SELECT 1 FROM core.${trackingTable} WHERE file_name = $1`, [key])
      if (existing.rowCount) continue
      const sql = await readFile(file, 'utf8')
      const client = await pool.connect()
      try {
        await client.query('BEGIN')
        await client.query(sql)
        await client.query(`INSERT INTO core.${trackingTable} (file_name) VALUES ($1)`, [key])
        await client.query('COMMIT')
        console.log(`${kind.slice(0, -1)} applied: ${key}`)
      } catch (error) {
        await client.query('ROLLBACK')
        throw new Error(`${key}: ${error.message}`, { cause: error })
      } finally {
        client.release()
      }
    }
  }
}

try {
  await pool.query('CREATE SCHEMA IF NOT EXISTS core')
  await pool.query('CREATE TABLE IF NOT EXISTS core.schema_migrations (file_name TEXT PRIMARY KEY, applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW())')
  await pool.query('CREATE TABLE IF NOT EXISTS core.seed_runs (file_name TEXT PRIMARY KEY, applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW())')
  await runTrackedFiles('migrations', 'schema_migrations')
  await runTrackedFiles('seeds', 'seed_runs')
  console.log('Feature schemas are up to date.')
} catch (error) {
  console.error('Database setup failed:', error.message)
  process.exitCode = 1
} finally {
  await pool.end()
}
