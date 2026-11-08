import express from 'express'
import authRoutes from './routes/authRoutes.js'
import { createHealthRouter } from '../../shared/healthRouter.js'
import { errorHandler, notFound } from '../../middleware/errors.js'
export function createIdentityApp() {
  const app = express()
  app.use(express.json({ limit: '1mb' }))
  app.use('/health', createHealthRouter('identity'))
  app.use('/api/v1/auth', authRoutes)
  app.use(notFound, errorHandler)
  return app
}
