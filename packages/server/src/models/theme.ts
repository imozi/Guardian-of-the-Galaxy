import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export interface ITheme {
  id: number
  name: string
}

export const themeModel: ModelAttributes<Model, ITheme> = {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  name: {
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'black',
  },
}
