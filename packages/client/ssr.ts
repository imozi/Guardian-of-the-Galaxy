import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import type { ViteDevServer } from 'vite'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const resolve = (p: string) => path.resolve(__dirname, p)
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.CLIENT_PORT || 5500
const base = process.env.BASE || '/'

const templateHtml = isProduction
  ? await fs.readFile(resolve('index.html'), 'utf-8')
  : ''
const ssrManifest = isProduction
  ? await fs.readFile(resolve('ssr-manifest.json'), 'utf-8')
  : undefined

const app = express()

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

app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl

    let template: string
    let render: ({
      url,
      ssrManifest,
    }: {
      url: string
      ssrManifest: string | undefined
    }) => Promise<{
      head: string
      html: string
      state: Record<string, unknown>
    }>

    if (!isProduction) {
      template = await fs.readFile(resolve('index.html'), 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule(resolve('/src/entry-server.tsx')))
        .render
    } else {
      template = templateHtml
      render = (await import(resolve('./entry-server.cjs'))).render
    }

    const rendered = await render({ url, ssrManifest })

    const html = template
      .replace(`<!--head-outlet-->`, rendered.head ?? '')
      .replace(`<!--ssr-outlet-->`, rendered.html ?? '')
      .replace(`<!--state-outlet-->`, JSON.stringify(rendered.state) ?? '')

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (e) {
    vite?.ssrFixStacktrace(e as Error)
    console.log(e)
    res.status(500).end(e)
  }
})

app.listen(port, () => {
  console.log(`  ➜ 🤟 Frontend started at http://localhost:${port}`)
})
