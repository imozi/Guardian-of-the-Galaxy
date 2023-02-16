import type { NextFunction, Request, Response } from 'express'
import { Reaction } from '../database/db'
import ApiError from '../error/ApiError'

export class ReactionController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { label, messageId } = req.body
    if (!label) {
      return next(ApiError.internal('label is required'))
    }

    if (!messageId) {
      return next(ApiError.internal('messageId is required'))
    }

    try {
      const reaction = await Reaction.create({ label, messageId })
      return res.json(reaction)
    } catch (e) {
      if (e instanceof Error) {
        return next(ApiError.badRequest(e.message))
      }

      return next(ApiError.badRequest('Unexpected error'))
    }
  }

  async getAll(req: Request, res: Response) {
    const { messageId } = req.params

    const reactions = await Reaction.findAndCountAll({
      where: { messageId: messageId },
    })
    return res.json(reactions)
  }
}
