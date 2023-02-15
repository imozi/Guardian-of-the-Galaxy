import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

type ReactionAttributes = {
  id: number
  label: string
}

export const reactionModel: ModelAttributes<Model, ReactionAttributes> = {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  label: {
    type: DataType.STRING,
    allowNull: false,
  },
}
