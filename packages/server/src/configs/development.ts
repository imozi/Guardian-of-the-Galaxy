import type { AppConfig } from '../types'
import { CLIENT_PORT, SERVER_PORT, YANDEX_API_URL } from '../constants/main'
import { developmentPresets } from './csp/development'

export const developmentConfig: AppConfig = {
  csp: {
    presets: developmentPresets,
  },
  cors: {
    allowedOrigins: [
      `http://localhost:${SERVER_PORT}`,
      `http://localhost:${CLIENT_PORT}`,
      YANDEX_API_URL,
    ],
  },
  logger: {
    format: 'dev',
  },
  database: {
    host: 'localhost',
  },
}
