import { Router } from 'express'
import { MessageController } from '../controllers/messageController'
import checkAuth from '../middleware/checkAuth'

const messageRouter = Router()
const messageController = new MessageController()

messageRouter.post('/', checkAuth, messageController.create)
messageRouter.get('/', checkAuth, messageController.getAll)

export default messageRouter
