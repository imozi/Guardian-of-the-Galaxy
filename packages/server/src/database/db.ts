import mongoose from 'mongoose'
import { Sequelize } from 'sequelize-typescript'
import type { SequelizeOptions } from 'sequelize-typescript'
import { topicModel } from '../models/topic'
import { userModel } from '../models/user'
import { messageModel } from '../models/message'
import { themeModel } from '../models/theme'

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  DB_HOST,
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOST,
  MONGO_DB,
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

export async function initPostgresConnection() {
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

export const initMongoDBConnection = async (): Promise<void> => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(
      `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:27017/${MONGO_DB}`
    )

    console.log('  ➜ 🎸 Connected to the Mongo database')
  } catch (e) {
    if (e instanceof Error) {
      console.error(`Mongo DB connect error: ${e.message}`)
    } else {
      console.error(e)
    }
  }
}
