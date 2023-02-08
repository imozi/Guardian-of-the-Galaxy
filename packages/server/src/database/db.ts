import { Sequelize } from 'sequelize-typescript'
import type { SequelizeOptions } from 'sequelize-typescript'
import { topicModel } from '../models/topic'
import { userModel } from '../models/user'
import { messageModel } from '../models/message'
import { themeModel } from '../models/theme'
import { cfg } from '@/cfg'

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  DB_HOST,
} = process.env

const { host, port, user, password, database } = cfg.database

// const sequelizeOptions: SequelizeOptions = {
//   host: DB_HOST,
//   port: Number(POSTGRES_PORT),
//   username: POSTGRES_USER,
//   password: POSTGRES_PASSWORD,
//   database: POSTGRES_DB,
//   dialect: 'postgres',
// }

const sequelizeOptions: SequelizeOptions = {
  host,
  port,
  username: user,
  password,
  database,
  dialect: 'postgres',
}

export const sequelize = new Sequelize(sequelizeOptions)

export const Theme = sequelize.define('theme', themeModel)
export const Topic = sequelize.define('topic', topicModel)
export const User = sequelize.define('user', userModel)
export const Message = sequelize.define('message', messageModel)

User.hasMany(Message, {
  sourceKey: 'externalId',
  foreignKey: 'userId',
})
Message.belongsTo(User, {
  targetKey: 'externalId',
  foreignKey: 'userId',
})

Topic.hasMany(Message, {
  foreignKey: 'topicId',
})
Message.belongsTo(Topic, {
  foreignKey: 'topicId',
})

export async function dbConnect() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('  ➜ 🐘 Connected to the database.')
  } catch (error) {
    console.error('  ➜ 😨 Unable to connect to the database:', error)
  }
}
