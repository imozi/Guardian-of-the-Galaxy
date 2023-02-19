import { FeedbackController } from '../controllers/feedbackController'
import { Router } from 'express'
import checkAuth from '../middleware/checkAuth'

const feedbackRouter = Router()
const feedbackController = new FeedbackController()

feedbackRouter.post('/', checkAuth, feedbackController.create)

export default feedbackRouter
