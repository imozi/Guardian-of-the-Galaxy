import type { RequestHandler } from 'express'
import morgan from 'morgan'
import { cfg } from '../cfg'

export const logger: RequestHandler = morgan(cfg.logger.format)
