import { integrationConfig } from '../config.js'

export class ApiError extends Error {
  constructor(message, { status = 0, code = 'NETWORK_ERROR', details } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.details = details
  }
}

export async function request(path, { method = 'GET', body, headers = {}, signal } = {}) {
  let response
  const accessToken = localStorage.getItem('accessToken')
  try {
    response = await fetch(`${integrationConfig.apiBaseUrl}${path}`, {
      method,
      signal,
      headers: { Accept: 'application/json', ...(body ? { 'Content-Type': 'application/json' } : {}), ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}), ...headers },
      ...(body ? { body: JSON.stringify(body) } : {}),
    })
  } catch (error) {
    if (error.name === 'AbortError') throw error
    throw new ApiError('Could not reach the school management API.', { code: 'CONNECTION_FAILED' })
  }

  const payload = response.status === 204 ? null : await response.json().catch(() => null)
  if (!response.ok) {
    throw new ApiError(payload?.error?.message || `Request failed (${response.status}).`, {
      status: response.status,
      code: payload?.error?.code || 'REQUEST_FAILED',
      details: payload?.error?.details,
    })
  }
  return payload?.data ?? payload
}
