import { createServer } from 'node:http'
import { pool } from '../config/database.js'
import { attachWebSocketServer } from '../websockets/socketServer.js'

export function startFeatureServer({ name, port, buildApp, websocket = false }) {
  let realtime
  const server = createServer(buildApp({ broadcast: (event) => realtime?.broadcast(event) }))
  if (websocket) realtime = attachWebSocketServer(server)
  server.listen(port, () => console.log(`${name} service listening on http://localhost:${port}`))

  async function shutdown() {
    realtime?.close()
    server.close(async () => {
      await pool.end()
      process.exit(0)
    })
  }
  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)
  return server
}
