import { Router } from 'express'
import { UserController } from '../controllers/userController'
import checkAuth from '../middleware/checkAuth'

const userRouter = Router()
const userController = new UserController()

userRouter.post('/', userController.create)
userRouter.put('/:id', checkAuth, userController.update)
userRouter.put('/:id/theme', checkAuth, userController.setTheme)
userRouter.get('/:id/theme', checkAuth, userController.getTheme)

export default userRouter
