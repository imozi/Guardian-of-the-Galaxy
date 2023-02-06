import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import { dbConnect } from './src/database/db'
import router from './src/routes'
import errorHandler from './src/middleware/ErrorHandlingMiddleware'

dotenv.config()

const app = express()

const clientPort = Number(process.env.CLIENT_PORT) || 3000
const serverPort = Number(process.env.SERVER_PORT) || 3001

const corsOptions = {
  credentials: true,
  origin: [`http://127.0.0.1:${clientPort}`, `http://localhost:${clientPort}`],
}

app.use(cors(corsOptions))
app.use(express.json())
app.use('/api/v1', router)
app.use(errorHandler)

app.get('/', (req, res) => {
  res.status(200).send('work')
})

dbConnect().then(() => {
  app.listen(serverPort, () => {
    console.log(`  ➜ 🥳 Backend started at http://localhost:${serverPort}`)
  })
})
