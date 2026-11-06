import { env } from '../../config/env.js'
import { createIdentityApp } from './app.js'
import { startFeatureServer } from '../../shared/startFeatureServer.js'
startFeatureServer({ name: 'Identity', port: env.identityPort, buildApp: createIdentityApp })
