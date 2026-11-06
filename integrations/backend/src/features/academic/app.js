import express from 'express'
import courseRoutes from './routes/courseRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import { createHealthRouter } from '../../shared/healthRouter.js'
import { errorHandler, notFound } from '../../middleware/errors.js'
export function createAcademicApp() {
  const app = express()
  app.use(express.json({ limit: '1mb' }))
  app.use('/health', createHealthRouter('academic'))
  app.use('/api/v1/courses', courseRoutes)
  app.use('/api/v1/dashboard', dashboardRoutes)
  app.use(notFound, errorHandler)
  return app
}
