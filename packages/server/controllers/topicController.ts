import { Topic } from '../init/db'
import type { Request, Response, NextFunction } from 'express'
import ApiError from '../error/ApiError'

export class TopicController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body
    if (!name) {
      return next(ApiError.internal('Name is required'))
    }

    try {
      const theme = await Topic.create({ name })
      return res.json(theme)
    } catch (e) {
      if (e instanceof Error) {
        return next(ApiError.badRequest(e.message))
      }

      return next(ApiError.badRequest('Unexpected error'))
    }
  }

  async getAll(req: Request, res: Response) {
    const themes = await Topic.findAll()
    return res.json(themes)
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params
    const topic = await Topic.findOne({ where: { id } })
    return res.json(topic)
  }
}
