import express from 'express'
import cors from 'cors'
import { env } from './config/env.js'

const serviceUrls = {
  identity: `http://127.0.0.1:${env.identityPort}`,
  academic: `http://127.0.0.1:${env.academicPort}`,
  faculty: `http://127.0.0.1:${env.facultyPort}`,
  finance: `http://127.0.0.1:${env.financePort}`,
}

function proxyTo(service) {
  return async (req, res) => {
    try {
      const headers = { Accept: 'application/json' }
      if (req.headers.authorization) headers.Authorization = req.headers.authorization
      if (req.headers['content-type']) headers['Content-Type'] = req.headers['content-type']
      const hasBody = !['GET', 'HEAD'].includes(req.method)
      const upstream = await fetch(`${serviceUrls[service]}${req.originalUrl}`, {
        method: req.method,
        headers,
        ...(hasBody ? { body: JSON.stringify(req.body ?? {}) } : {}),
      })
      const body = await upstream.text()
      res.status(upstream.status)
      res.type(upstream.headers.get('content-type') || 'application/json')
      res.send(body)
    } catch {
      res.status(502).json({ error: { code: 'SERVICE_UNAVAILABLE', message: `The ${service} service is not available.` } })
    }
  }
}

export function createGatewayApp() {
  const app = express()
  app.disable('x-powered-by')
  app.use(cors({ origin: env.frontendOrigin }))
  app.use(express.json({ limit: '1mb' }))
  app.get('/api/v1/health', async (req, res) => {
    const checks = await Promise.all(Object.entries(serviceUrls).map(async ([name, url]) => {
      try {
        const response = await fetch(`${url}/health`, { signal: AbortSignal.timeout(1500) })
        return [name, response.ok ? 'ok' : 'unhealthy']
      } catch { return [name, 'unavailable'] }
    }))
    const services = Object.fromEntries(checks)
    const healthy = Object.values(services).every((status) => status === 'ok')
    res.status(healthy ? 200 : 503).json({ data: { status: healthy ? 'ok' : 'degraded', services } })
  })
  app.use('/api/v1/auth', proxyTo('identity'))
  app.use('/api/v1/courses', proxyTo('academic'))
  app.use('/api/v1/dashboard', proxyTo('academic'))
  app.use('/api/v1/lecturers', proxyTo('faculty'))
  app.use('/api/v1/finance', proxyTo('finance'))
  app.use('/api/v1/payments', proxyTo('finance'))
  app.use((req, res) => res.status(404).json({ error: { code: 'NOT_FOUND', message: `No route for ${req.method} ${req.path}` } }))
  return app
}
