import type { RequestHandler } from 'express'
import corsMiddleware from 'cors'
import { cfg } from '@/cfg'

const options = {
  ...cfg.cors,
}

const { allowedOrigins } = options

if (allowedOrigins) {
  options.origin = (origin, callback) => {
    if (!origin) {
      callback(null, true)
      return
    }

    const isAllowed = allowedOrigins.some(el => {
      if (el instanceof RegExp) {
        return el.test(origin)
      }
      return origin.match(el)
    })

    if (isAllowed) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

export const cors: RequestHandler = corsMiddleware(options)
