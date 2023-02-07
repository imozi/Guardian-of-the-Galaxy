import { Router } from 'express'
import { UserController } from '../controllers/userController'

const userRouter = Router()
const userController = new UserController()

userRouter.post('/', userController.create)
userRouter.put('/:id', userController.update)
userRouter.put('/:id/theme', userController.setTheme)
userRouter.get('/:id/theme', userController.getTheme)

export default userRouter
