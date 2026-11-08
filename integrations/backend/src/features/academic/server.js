import { env } from '../../config/env.js'
import { createAcademicApp } from './app.js'
import { startFeatureServer } from '../../shared/startFeatureServer.js'
startFeatureServer({ name: 'Academic', port: env.academicPort, buildApp: createAcademicApp })
