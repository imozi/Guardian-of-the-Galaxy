import { Message, User } from '../init/db'
import type { Request, Response, NextFunction } from 'express'
import ApiError from '../error/ApiError'

export class MessageController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { userId, topicId, text } = req.body
    if (!text) {
      return next(ApiError.internal('text is required'))
    }

    if (!userId) {
      return next(ApiError.internal('userId is required'))
    }

    if (!topicId) {
      return next(ApiError.internal('topicId is required'))
    }

    try {
      const message = await Message.create({ userId, topicId, text })
      return res.json(message)
    } catch (e) {
      if (e instanceof Error) {
        return next(ApiError.badRequest(e.message))
      }

      return next(ApiError.badRequest('Unexpected error'))
    }
  }

  async getAll(req: Request, res: Response) {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 5
    const topicId = Number(req.query.topicId)
    const offset = page * limit - limit
    let messages

    if (topicId) {
      messages = await Message.findAndCountAll({
        where: { topicId },
        include: User,
        offset,
        limit,
      })
    } else {
      messages = await Message.findAndCountAll({
        include: User,
        offset,
        limit,
      })
    }

    return res.json(messages)
  }
}
