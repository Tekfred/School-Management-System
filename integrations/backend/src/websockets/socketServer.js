import { WebSocketServer } from 'ws'

export function attachWebSocketServer(server) {
  const sockets = new WebSocketServer({ noServer: true })
  server.on('upgrade', (request, socket, head) => {
    if (request.url !== '/ws') return socket.destroy()
    sockets.handleUpgrade(request, socket, head, (client) => sockets.emit('connection', client, request))
  })
  sockets.on('connection', (client) => {
    client.send(JSON.stringify({ type: 'connection.ready', data: { connected: true } }))
    client.on('message', (raw) => {
      let message
      try { message = JSON.parse(raw.toString()) } catch { return client.send(JSON.stringify({ type: 'error', error: 'Send JSON messages.' })) }
      if (message.type === 'ping') client.send(JSON.stringify({ type: 'pong', at: new Date().toISOString() }))
    })
  })
  return {
    broadcast(event) {
      const payload = JSON.stringify(event)
      for (const client of sockets.clients) if (client.readyState === 1) client.send(payload)
    },
    close: () => sockets.close(),
  }
}
