import express from 'express'
import financeRoutes from './routes/financeRoutes.js'
import { createPaymentRoutes } from './routes/paymentRoutes.js'
import { createHealthRouter } from '../../shared/healthRouter.js'
import { errorHandler, notFound } from '../../middleware/errors.js'
export function createFinanceApp({ broadcast }) {
  const app = express()
  app.use(express.json({ limit: '1mb' }))
  app.use('/health', createHealthRouter('finance'))
  app.use('/api/v1/finance', financeRoutes)
  app.use('/api/v1/payments', createPaymentRoutes({ broadcast }))
  app.use(notFound, errorHandler)
  return app
}
