//TODO
import { join } from 'path'
import type { AppConfig } from '../types'
import { defaultPresets } from './csp/default'
import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
  SERVER_PORT,
} from '../constants/main'

export const defaultConfig: AppConfig = {
  csp: {
    presets: defaultPresets,
    policies: {},
    serviceName: 'ssr-app',
    useDefaultReportUri: true,
  },
  cors: {
    credentials: true,
    methods: 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
  },
  static: {
    baseUrl: '',
    staticDir: join(__dirname, '..', '..', '..', 'client/dist/'),
  },
  logger: {
    format: 'combined',
  },
  server: {
    port: SERVER_PORT,
  },
  database: {
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT),
    user: POSTGRES_USER,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
  },
  helmet: {
    crossOriginEmbedderPolicy: false,
  },
}
