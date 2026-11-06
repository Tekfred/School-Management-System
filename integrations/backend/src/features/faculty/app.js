import express from 'express'
import lecturerRoutes from './routes/lecturerRoutes.js'
import { createHealthRouter } from '../../shared/healthRouter.js'
import { errorHandler, notFound } from '../../middleware/errors.js'
export function createFacultyApp() {
  const app = express()
  app.use(express.json({ limit: '1mb' }))
  app.use('/health', createHealthRouter('faculty'))
  app.use('/api/v1/lecturers', lecturerRoutes)
  app.use(notFound, errorHandler)
  return app
}
