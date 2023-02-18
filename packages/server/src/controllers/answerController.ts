import type { NextFunction, Request, Response } from 'express'
import { Answer, User } from '../database/db'
import ApiError from '../error/ApiError'

export class AnswerController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { userId, messageId, text } = req.body
    if (!text) {
      return next(ApiError.internal('text is required'))
    }

    if (!userId) {
      return next(ApiError.internal('userId is required'))
    }

    if (!messageId) {
      return next(ApiError.internal('messageId is required'))
    }

    try {
      const answer = await Answer.create({ userId, messageId, text })
      return res.json(answer)
    } catch (e) {
      if (e instanceof Error) {
        return next(ApiError.badRequest(e.message))
      }

      return next(ApiError.badRequest('Unexpected error'))
    }
  }

  async getAll(req: Request, res: Response) {
    const { messageId } = req.params

    const answers = await Answer.findAll({
      where: { messageId: messageId },
      include: [
        {
          model: User,
        },
      ],
      order: ['id'],
    })

    return res.json(answers)
  }
}
