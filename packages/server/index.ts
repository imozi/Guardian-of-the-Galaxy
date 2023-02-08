import dotenv from 'dotenv'
import express from 'express'
import { dbConnect } from './src/database/db'
import router from './src/routes'
import errorHandler from './src/middleware/ErrorHandlingMiddleware'
import { cors } from './src/middleware/cors'
import { logger } from './src/middleware/logger'
import { cfg } from './src/cfg'

dotenv.config()

const app = express()

app.use(cors)
app.use(logger)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/v1', router)
app.use(errorHandler)

app.get('/', (req, res) => {
  res.status(200).send('work')
})

dbConnect().then(() => {
  app.listen(cfg.server.port, () => {
    console.log(`  ➜ 🥳 Backend started at ${cfg.server.port}`)
  })
})
