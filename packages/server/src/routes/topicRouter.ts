import { Router } from 'express'
import { TopicController } from '../controllers/topicController'
import checkAuth from '../middleware/checkAuth'

const topicRouter = Router()
const topicController = new TopicController()

topicRouter.post('/', checkAuth, topicController.create)
topicRouter.get('/', checkAuth, topicController.getAll)
topicRouter.get('/:id', checkAuth, topicController.getOne)

export default topicRouter
