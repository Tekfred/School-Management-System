import { spawn } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
const here = dirname(fileURLToPath(import.meta.url))
const backendRoot = resolve(here, '..')
const watch = process.argv.includes('--watch')
const services = [
  ['api-gateway', 'server.js'],
  ['identity-service', 'features/identity/server.js'],
  ['academic-service', 'features/academic/server.js'],
  ['faculty-service', 'features/faculty/server.js'],
  ['finance-service', 'features/finance/server.js'],
]
const children = services.map(([name, entry]) => {
  const args = [...(watch ? ['--watch'] : []), resolve(here, entry)]
  return spawn(process.execPath, args, {
    cwd: backendRoot,
    stdio: 'inherit',
    env: { ...process.env, SERVICE_NAME: name },
  })
})
function stopAll() {
  for (const child of children) child.kill('SIGTERM')
}
process.on('SIGINT', stopAll)
process.on('SIGTERM', stopAll)
for (const child of children) child.on('exit', (code) => { if (code && code !== 0) stopAll() })
