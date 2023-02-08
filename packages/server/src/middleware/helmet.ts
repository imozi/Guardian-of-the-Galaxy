import type { RequestHandler } from 'express'
import helmetMiddleware from 'helmet'
import { cfg } from '@/cfg'

export const helmet: RequestHandler = helmetMiddleware(cfg.helmet)
