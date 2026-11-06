import { Router } from 'express'
import { query } from '../config/database.js'
export function createHealthRouter(service) {
  const router = Router()
  router.get('/', async (req, res) => {
    await query('SELECT 1')
    res.json({ data: { service, status: 'ok', database: 'connected', timestamp: new Date().toISOString() } })
  })
  return router
}
