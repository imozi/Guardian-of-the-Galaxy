import { Router } from 'express'
import { ThemeController } from '../controllers/themeController'
import checkAuth from '../middleware/checkAuth'

const themeRouter = Router()
const themeController = new ThemeController()

themeRouter.post('/', checkAuth, themeController.create)
themeRouter.get('/', checkAuth, themeController.getAll)

export default themeRouter
