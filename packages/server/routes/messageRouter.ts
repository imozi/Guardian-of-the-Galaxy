import { Router } from 'express'
import { MessageController } from '../controllers/messageController'

const messageRouter = Router()
const messageController = new MessageController()

messageRouter.post('/', messageController.create)
messageRouter.get('/:topicId', messageController.getAll)

export default messageRouter
