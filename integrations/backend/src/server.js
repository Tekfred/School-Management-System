import { createServer } from 'node:http'
import { createGatewayApp } from './gateway.js'
import { env } from './config/env.js'
const server = createServer(createGatewayApp())
server.listen(env.gatewayPort, () => console.log(`EduSuite API gateway listening on http://localhost:${env.gatewayPort}`))
