import dotenv from 'dotenv'
import cors from 'cors'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'

dotenv.config()

import express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import { store } from './store'
import type { Store } from '@reduxjs/toolkit'

const isDev = () => process.env.NODE_ENV === 'development'

async function startServer() {
  const app = express()

  const clientPort = Number(process.env.CLIENT_PORT) || 3000
  const serverPort = Number(process.env.SERVER_PORT) || 3001

  const corsOptions = {
    credentials: true,
    origin: [
      `http://127.0.0.1:${clientPort}`,
      `http://localhost:${clientPort}`,
    ],
  }

  app.use(cors(corsOptions))

  let vite: ViteDevServer | undefined

  const distPath = path.resolve('../client/dist/')
  const ssrClientPath = path.resolve('../client/ssr-dist/client.cjs')
  const srcPath = path.resolve('../client')

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  }

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
    app.use('/images', express.static(path.resolve(distPath, 'images')))
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template: string

      if (!isDev()) {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8'
        )
      } else {
        template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')

        template = await vite!.transformIndexHtml(url, template)
      }

      let render: (url: string, store: Store) => Promise<string>

      if (!isDev()) {
        render = (await import(ssrClientPath)).render
      } else {
        render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
          .render
      }

      const stateMarkup = `<script>window.__PRELOADED_STATE__=${JSON.stringify(
        store.getState()
      ).replace(/</g, '\\u003c')}</script>`

      const appHtml = await render(url, store)

      const html = template.replace(`<!--ssr-outlet-->`, stateMarkup + appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (isDev()) {
        vite!.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })

  app.listen(serverPort, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${serverPort}`)
  })
}

startServer()
