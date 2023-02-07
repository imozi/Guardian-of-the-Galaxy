import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

type UserAttributes = {
  id: number
  externalId: number
  name: string
  avatar: string
  themeName: string
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
    unique: true,
    allowNull: false,
  },
  name: {
    type: DataType.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataType.STRING,
  },
  themeName: {
    type: DataType.STRING,
    defaultValue: 'space',
  },
}
