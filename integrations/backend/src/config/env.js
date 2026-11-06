import 'dotenv/config'

export const env = {
  gatewayPort: Number(process.env.GATEWAY_PORT || 4000),
  identityPort: Number(process.env.IDENTITY_SERVICE_PORT || 4101),
  academicPort: Number(process.env.ACADEMIC_SERVICE_PORT || 4102),
  facultyPort: Number(process.env.FACULTY_SERVICE_PORT || 4103),
  financePort: Number(process.env.FINANCE_SERVICE_PORT || 4104),
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendOrigin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  databaseUrl: process.env.DATABASE_URL,
  databaseSsl: process.env.DATABASE_SSL === 'true',
}
