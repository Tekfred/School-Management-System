import { useEffect, useState } from 'react'
import { integrationConfig } from '../integrations/config.js'

/** Load a resource through the configured mock/API adapter. */
export function useIntegrationResource({ mockData, load, enabled = true }) {
  const [data, setData] = useState(mockData)
  const [loading, setLoading] = useState(!integrationConfig.isMock && enabled)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!enabled || integrationConfig.isMock) {
      setData(mockData)
      setLoading(false)
      setError('')
      return undefined
    }
    const controller = new AbortController()
    setLoading(true)
    setError('')
    load({ signal: controller.signal })
      .then(setData)
      .catch((reason) => { if (reason.name !== 'AbortError') setError(reason.message || 'Could not load this information.') })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [enabled, load, mockData])

  return { data, loading, error, isMock: integrationConfig.isMock }
}
