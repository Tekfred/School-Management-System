import { env } from '../../config/env.js'
import { createFacultyApp } from './app.js'
import { startFeatureServer } from '../../shared/startFeatureServer.js'
startFeatureServer({ name: 'Faculty', port: env.facultyPort, buildApp: createFacultyApp })
