import { User } from '../init/db'
import type { Request, Response, NextFunction } from 'express'
import ApiError from '../error/ApiError'

export class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { id, name } = req.body

    if (!id) {
      return next(ApiError.internal('User id is required'))
    }

    if (!name) {
      return next(ApiError.internal('Name is required'))
    }

    try {
      const user = await User.create({ name })
      return res.json(user)
    } catch (e) {
      if (e instanceof Error) {
        return next(ApiError.badRequest(e.message))
      }

      return next(ApiError.badRequest('Unexpected error'))
    }
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id)

    const user = await User.update(req.body, { where: { id } })
    return res.json(user)
  }
}
