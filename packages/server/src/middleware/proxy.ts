import { NextFunction, Request, Response } from 'express'
import { YANDEX_API } from '../config/constants'
import { createProxyMiddleware } from 'http-proxy-middleware'
import 'cross-fetch/polyfill'

export default function (req: Request, res: Response, next: NextFunction) {
  return createProxyMiddleware({
    target: YANDEX_API,
    pathRewrite: { '^/api/ya': '' },
    changeOrigin: true,
    secure: false,
    cookieDomainRewrite: { 'ya-praktikum.tech': req.hostname },
  })(req, res, next)
}
