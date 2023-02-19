import { Router } from 'express'
import answerRouter from './answerRouter '
import messageRouter from './messageRouter'
import reactionRouter from './reactionRouter'
import themeRouter from './themeRouter'
import topicRouter from './topicRouter'
import userRouter from './userRouter'
import feedbackRouter from './feedbackRouter'

const router = Router()

router.use('/theme', themeRouter)
router.use('/topic', topicRouter)
router.use('/user', userRouter)
router.use('/message', messageRouter)
router.use('/feedback', feedbackRouter)
router.use('/reaction', reactionRouter)
router.use('/answer', answerRouter)

export default router
