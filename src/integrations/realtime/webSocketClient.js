import { integrationConfig } from '../config.js'

/** Create a native WebSocket connection; call close() when its owner unmounts. */
export function connectWebSocket({ onMessage, onStatus, protocols } = {}) {
  let socket
  let closedByClient = false
  let retryTimer
  let retryDelay = 1000

  const connect = () => {
    if (closedByClient) return
    socket = new WebSocket(integrationConfig.websocketUrl, protocols)
    socket.addEventListener('open', () => { retryDelay = 1000; onStatus?.('connected') })
    socket.addEventListener('message', (event) => {
      try { onMessage?.(JSON.parse(event.data)) } catch { onMessage?.(event.data) }
    })
    socket.addEventListener('error', () => onStatus?.('error'))
    socket.addEventListener('close', () => {
      onStatus?.('disconnected')
      if (closedByClient) return
      retryTimer = window.setTimeout(connect, retryDelay)
      retryDelay = Math.min(retryDelay * 2, 30000)
    })
  }

  connect()
  return {
    send(message) {
      if (socket?.readyState !== WebSocket.OPEN) throw new Error('WebSocket is not connected.')
      socket.send(typeof message === 'string' ? message : JSON.stringify(message))
    },
    close() {
      closedByClient = true
      window.clearTimeout(retryTimer)
      socket?.close()
    },
  }
}
