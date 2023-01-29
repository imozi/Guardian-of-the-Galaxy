import { Router } from 'express'
import themeRouter from './themeRouter'
import topicRouter from './topicRouter'

const router = Router()

router.use('/theme', themeRouter)
router.use('/topic', topicRouter)

export default router