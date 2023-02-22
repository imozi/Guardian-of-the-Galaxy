import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

type ThemeAttributes = {
  id: number
  name: string
}

export const themeModel: ModelAttributes<Model, ThemeAttributes> = {
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
