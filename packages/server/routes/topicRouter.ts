import { Router } from 'express'
import { TopicController } from '../controllers/topicController'

const topicRouter = Router()
const topicController = new TopicController()

topicRouter.post('/', topicController.create)
topicRouter.get('/', topicController.getAll)
topicRouter.get('/:id', topicController.getOne)

export default topicRouter