import { useEffect, useRef, useState } from 'react'
import { connectWebSocket } from '../integrations/realtime/webSocketClient.js'

export function useWebSocket({ enabled = true, onMessage } = {}) {
  const [status, setStatus] = useState('disconnected')
  const messageHandler = useRef(onMessage)
  messageHandler.current = onMessage

  useEffect(() => {
    if (!enabled) {
      setStatus('disconnected')
      return undefined
    }
    let connection
    try {
      connection = connectWebSocket({
        onStatus: setStatus,
        onMessage: (event) => messageHandler.current?.(event),
      })
    } catch {
      setStatus('error')
    }
    return () => connection?.close()
  }, [enabled])

  return { status }
}
