import pg from 'pg'
import { env } from './env.js'

const { Pool } = pg
export const pool = new Pool({
  connectionString: env.databaseUrl,
  ssl: env.databaseSsl ? { rejectUnauthorized: false } : false,
  application_name: process.env.SERVICE_NAME || 'edusuite-api',
})
pool.on('error', (error) => console.error('Unexpected PostgreSQL pool error:', error))
export const query = (text, values) => pool.query(text, values)
