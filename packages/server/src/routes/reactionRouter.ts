import { Router } from 'express'
import { ReactionController } from '../controllers/reactionController'
import checkAuth from '../middleware/checkAuth'

const reactionRouter = Router()
const reactionController = new ReactionController()

reactionRouter.post('/', checkAuth, reactionController.create)
reactionRouter.get('/:messageId', checkAuth, reactionController.getAll)

export default reactionRouter
