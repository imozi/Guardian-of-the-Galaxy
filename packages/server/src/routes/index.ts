import { Router } from 'express'
import themeRouter from './themeRouter'
import topicRouter from './topicRouter'
import userRouter from './userRouter'
import messageRouter from './messageRouter'

const router = Router()

router.use('/theme', themeRouter)
router.use('/topic', topicRouter)
router.use('/user', userRouter)
router.use('/message', messageRouter)

export default router
