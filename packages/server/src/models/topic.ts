import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

type TopicAttributes = {
  id: number
  name: string
}

export const topicModel: ModelAttributes<Model, TopicAttributes> = {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  name: {
    type: DataType.STRING,
    allowNull: false,
  },
}
