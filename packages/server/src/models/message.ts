import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

type MessageAttributes = {
  id: number
  text: string
}

export const messageModel: ModelAttributes<Model, MessageAttributes> = {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  text: {
    type: DataType.STRING,
    allowNull: false,
  },
}
