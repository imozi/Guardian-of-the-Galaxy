import { User } from '../database/db'
import type { Request, Response, NextFunction } from 'express'
import ApiError from '../error/ApiError'

export class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { externalId, name, avatar } = req.body

    if (!externalId) {
      return next(ApiError.internal('externalId is required'))
    }

    if (!name) {
      return next(ApiError.internal('name is required'))
    }

    try {
      const user = await User.create({ externalId, name, avatar })
      return res.json(user)
    } catch (e) {
      if (e instanceof Error) {
        return next(ApiError.badRequest(e.message))
      }

      return next(ApiError.badRequest('Unexpected error'))
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const externalId = Number(req.params.id)

    try {
      await User.update(req.body, { where: { externalId } })
      return res.send('Ok')
    } catch (e) {
      if (e instanceof Error) {
        return next(ApiError.badRequest(e.message))
      }

      return next(ApiError.badRequest('Unexpected error'))
    }
  }
}
