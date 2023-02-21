import type { NextFunction, Request, Response } from 'express'
import { Answer, Message, Reaction, User } from '../database/db'
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
    const { topicId } = req.params

    const messages = await Message.findAndCountAll({
      where: { topicId: topicId },
      include: [
        {
          model: User,
        },
        {
          model: Answer,
          include: [{ model: User }],
        },
        {
          model: Reaction,
        },
      ],
      order: [
        ['createdAt', 'DESC'],
        [Answer, 'createdAt', 'DESC'],
      ],
    })

    return res.json(messages)
  }
}
