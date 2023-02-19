import { Feedback } from '../mongoModels/Feedback'
import type { Request, Response, NextFunction } from 'express'
import ApiError from '../error/ApiError'

export class FeedbackController {
  async create(req: Request, res: Response, next: NextFunction) {
    if (!req.body.message) {
      return next(ApiError.internal('message is required'))
    }

    try {
      console.log(req.body)
      const feedback = new Feedback(req.body)
      console.log(feedback)
      await feedback.save()
      return res.json(feedback)
    } catch (e) {
      if (e instanceof Error) {
        return next(ApiError.badRequest(e.message))
      }

      return next(ApiError.badRequest('Unexpected error'))
    }
  }
}
