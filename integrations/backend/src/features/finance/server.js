import { env } from '../../config/env.js'
import { createFinanceApp } from './app.js'
import { startFeatureServer } from '../../shared/startFeatureServer.js'
startFeatureServer({ name: 'Finance', port: env.financePort, buildApp: createFinanceApp, websocket: true })
