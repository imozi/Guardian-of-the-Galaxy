import { Theme } from '../database/db'
import type { Request, Response, NextFunction } from 'express'
import ApiError from '../error/ApiError'

export class ThemeController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body
    if (!name) {
      return next(ApiError.internal('name is required'))
    }

    try {
      const theme = await Theme.create({ name })
      return res.json(theme)
    } catch (e) {
      if (e instanceof Error) {
        return next(ApiError.badRequest(e.message))
      }

      return next(ApiError.badRequest('Unexpected error'))
    }
  }

  async getAll(req: Request, res: Response) {
    const themes = await Theme.findAll()
    return res.json(themes)
  }
}
