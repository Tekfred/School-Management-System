const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1').replace(/\/$/, '')

export const integrationConfig = Object.freeze({
  dataSource: import.meta.env.VITE_DATA_SOURCE || 'mock',
  apiBaseUrl,
  websocketUrl: import.meta.env.VITE_WEBSOCKET_URL || 'ws://localhost:4000/ws',
  isMock: (import.meta.env.VITE_DATA_SOURCE || 'mock') === 'mock',
})
