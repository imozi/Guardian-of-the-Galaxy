import checkAuth from '@/middleware/checkAuth'
import { Router } from 'express'
import { MessageController } from '../controllers/messageController'

const messageRouter = Router()
const messageController = new MessageController()

messageRouter.post('/', checkAuth, messageController.create)
messageRouter.get('/:topicId', checkAuth, messageController.getAll)

export default messageRouter
