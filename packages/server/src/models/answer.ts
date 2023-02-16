import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

type AnswerAttributes = {
  id: number
  text: string
}

export const answerModel: ModelAttributes<Model, AnswerAttributes> = {
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
