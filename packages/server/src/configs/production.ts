import type { AppConfig } from '../types'
import { YANDEX_API_URL } from '../constants/main'
import { productionPresets } from './csp/production'

export const productionConfig: AppConfig = {
  csp: {
    presets: productionPresets,
  },
  cors: {
    allowedOrigins: [YANDEX_API_URL],
  },
}
