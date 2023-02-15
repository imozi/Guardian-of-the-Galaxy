import { Router } from 'express'
import { AnswerController } from '../controllers/answerController'

const answerRouter = Router()
const answerController = new AnswerController()

answerRouter.post('/', answerController.create)
answerRouter.get('/:messageId', answerController.getAll)

export default answerRouter
