import { Sequelize } from 'sequelize-typescript'
import type { SequelizeOptions } from 'sequelize-typescript'
import { themeModel } from '../models/theme'
import { topicModel } from '../models/topic'
import { userModel } from '../models/user'
import { messageModel } from '../models/message'

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  DB_HOST,
} = process.env

const sequelizeOptions: SequelizeOptions = {
  host: DB_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
}

export const sequelize = new Sequelize(sequelizeOptions)

export const Theme = sequelize.define('Theme', themeModel)
export const Topic = sequelize.define('Topic', topicModel)
export const User = sequelize.define('User', userModel)
export const Message = sequelize.define('Message', messageModel)

User.hasMany(Message, {
  sourceKey: 'externalId',
  foreignKey: 'userId'
})
Message.belongsTo(User, {
  targetKey: 'externalId',
  foreignKey: 'userId'
})

Topic.hasMany(Message, {
  foreignKey: 'topicId'
})
Message.belongsTo(Topic, {
  foreignKey: 'topicId'
})

export async function dbConnect() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
