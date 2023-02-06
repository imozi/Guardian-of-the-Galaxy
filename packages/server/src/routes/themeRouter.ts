import { Router } from 'express'
import { ThemeController } from '../controllers/themeController'

const themeRouter = Router()
const themeController = new ThemeController()

themeRouter.post('/', themeController.create)
themeRouter.get('/', themeController.getAll)

export default themeRouter
