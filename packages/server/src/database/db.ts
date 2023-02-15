import type { SequelizeOptions } from 'sequelize-typescript'
import { Sequelize } from 'sequelize-typescript'
import { answerModel } from '../models/answer'
import { messageModel } from '../models/message'
import { reactionModel } from '../models/reaction'
import { themeModel } from '../models/theme'
import { topicModel } from '../models/topic'
import { userModel } from '../models/user'

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
