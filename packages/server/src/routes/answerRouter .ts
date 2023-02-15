import checkAuth from '@/middleware/checkAuth'
import { Router } from 'express'
import { AnswerController } from '../controllers/answerController'

const answerRouter = Router()
const answerController = new AnswerController()

answerRouter.post('/', checkAuth, answerController.create)
answerRouter.get('/:messageId', checkAuth, answerController.getAll)

export default answerRouter
