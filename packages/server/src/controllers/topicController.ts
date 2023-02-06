import { Message, sequelize, Topic } from '../database/db'
import type { Request, Response, NextFunction } from 'express'
import ApiError from '../error/ApiError'

export class TopicController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body
    if (!name) {
      return next(ApiError.internal('name is required'))
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
            sequelize.fn('COUNT', sequelize.col('messages.id')),
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
      group: ['topic.id'],
    })
    return res.json(topics)
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const topic = await Topic.findOne({ where: { id } })

    if (topic) {
      return res.json(topic)
    } else {
      return next(ApiError.badRequest('Not found'))
    }
  }
}
