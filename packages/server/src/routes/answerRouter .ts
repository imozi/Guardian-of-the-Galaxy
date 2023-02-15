import { Router } from 'express'
import { AnswerController } from '../controllers/answerController'
import checkAuth from '../middleware/checkAuth'

const answerRouter = Router()
const answerController = new AnswerController()

answerRouter.post('/', checkAuth, answerController.create)
answerRouter.get('/:messageId', checkAuth, answerController.getAll)

export default answerRouter
