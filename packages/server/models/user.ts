import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

type UserAttributes = {
  id: number
  externalId: number
  name: string
  avatar: string
}

export const userModel: ModelAttributes<Model, UserAttributes> = {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  externalId: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataType.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataType.STRING,
  },
}
