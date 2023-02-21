import mongoose from 'mongoose'
import { Sequelize } from 'sequelize-typescript'
import type { SequelizeOptions } from 'sequelize-typescript'
import { answerModel } from '../models/answer'
import { messageModel } from '../models/message'
import { reactionModel } from '../models/reaction'
import { themeModel } from '../models/theme'
import { topicModel } from '../models/topic'
import { userModel } from '../models/user'

const {
  NODE_ENV,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOST,
  MONGO_DB,
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
export const Reaction = sequelize.define('reaction', reactionModel)
export const Answer = sequelize.define('answer', answerModel)

Message.hasMany(Answer, {
  sourceKey: 'id',
  foreignKey: 'messageId',
})

Answer.belongsTo(Message, {
  targetKey: 'id',
  foreignKey: 'messageId',
})

User.hasMany(Answer, {
  sourceKey: 'externalId',
  foreignKey: 'userId',
})

Answer.belongsTo(User, {
  targetKey: 'externalId',
  foreignKey: 'userId',
})

Message.hasMany(Reaction, {
  sourceKey: 'id',
  foreignKey: 'messageId',
})

Reaction.belongsTo(Message, {
  targetKey: 'id',
  foreignKey: 'messageId',
})

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
