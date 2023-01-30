import { Message, sequelize, Topic } from '../init/db'
import type { Request, Response, NextFunction } from 'express'
import ApiError from '../error/ApiError'

export class TopicController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body
    if (!name) {
      return next(ApiError.internal('Name is required'))
    }

    try {
      const topic = await Topic.create({ name })
      return res.json(topic)
    } catch (e) {
      if (e instanceof Error) {
        return next(ApiError.badRequest(e.message))
      }

      return next(ApiError.badRequest('Unexpected error'))
    }
  }

  async getAll(req: Request, res: Response) {
    const topics = await Topic.findAll({
      attributes: {
        include: [
          [
            sequelize.fn('COUNT', sequelize.col('Messages.id')),
            'messagesCount',
          ],
        ],
      },
      include: [
        {
          model: Message,
          attributes: [],
        },
      ],
      group: ['Topic.id'],
    })
    return res.json(topics)
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params
    const topic = await Topic.findOne({ where: { id } })
    return res.json(topic)
  }
}
