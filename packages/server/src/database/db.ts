import { Sequelize } from 'sequelize-typescript'
import type { SequelizeOptions } from 'sequelize-typescript'
import { topicModel } from '../models/topic'
import { userModel } from '../models/user'
import { messageModel } from '../models/message'
import { themeModel } from '../models/theme'

const {
  NODE_ENV,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST_DEV,
  POSTGRES_HOST,
} = process.env

const sequelizeOptions: SequelizeOptions = {
  host: NODE_ENV === 'production' ? POSTGRES_HOST : POSTGRES_HOST_DEV,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
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

    await Theme.findOrCreate({ where: { name: 'space' } })
    await Theme.findOrCreate({ where: { name: 'mars' } })
    await Theme.findOrCreate({ where: { name: 'saturn' } })
    await Theme.findOrCreate({ where: { name: 'uranus' } })
  } catch (error) {
    console.error('  ➜ 😨 Unable to connect to the database:', error)
  }
}
