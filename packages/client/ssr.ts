import fs from 'node:fs/promises'
import express from 'express'
import dotenv from 'dotenv'
import type { ViteDevServer } from 'vite'
import path from 'path'
import { fileURLToPath } from 'node:url'
dotenv.config()

// Constants
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const resolve = (p: string) => path.resolve(__dirname, p)
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5500
const base = process.env.BASE || '/'

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile(resolve('index.html'), 'utf-8')
  : ''
const ssrManifest = isProduction
  ? await fs.readFile(resolve('ssr-manifest.json'), 'utf-8')
  : undefined

// Create http server
const app = express()

// Add Vite or respective production middlewares
let vite: ViteDevServer

if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv(resolve('./'), { extensions: [] }))
}

// Serve HTML
app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl

    let template
    let render

    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile(resolve('index.html'), 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule(resolve('/src/entry-server.tsx')))
        .render
    } else {
      template = templateHtml
      render = (await import(resolve('./entry-server.cjs'))).render
    }

    const rendered = await render(url, ssrManifest)

    const html = template
      .replace(`<!--head-outlet-->`, rendered.head ?? '')
      .replace(`<!--ssr-outlet-->`, rendered.html ?? '')
      .replace(`<!--store-outlet-->`, rendered.store ?? '')

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (e: any) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
