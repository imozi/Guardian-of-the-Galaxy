import type { RequestHandler } from 'express'
import { expressCspHeader } from '../utils/express-csp-header'
import { cfg } from '../cfg'

export const csp: RequestHandler = expressCspHeader(cfg.csp)
