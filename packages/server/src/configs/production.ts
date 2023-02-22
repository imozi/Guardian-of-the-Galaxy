import type { AppConfig } from '../types'
import {
  CLIENT_PORT,
  MAIN_DOMAIN,
  SERVER_PORT,
  YANDEX_API_URL,
} from '../constants/main'
import { productionPresets } from './csp/production'

export const productionConfig: AppConfig = {
  csp: {
    presets: productionPresets,
  },
  cors: {
    allowedOrigins: [
      `http://localhost:${SERVER_PORT}`,
      `http://localhost:${CLIENT_PORT}`,
      YANDEX_API_URL,
      MAIN_DOMAIN,
    ],
  },
}
