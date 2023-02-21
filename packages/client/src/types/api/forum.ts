export type ThemeDTO = {
  id: number
  name: string
  createdAt?: string
  updatedAt?: string
}

export type TopicDTO = {
  id: number
  name: string
  messagesCount?: string
  createdAt?: string
  updatedAt?: string
}

export type TopicInputDTO = {
  name: string
}

export type MessageInputDTO = {
  text: string
  userId: number
  topicId: number
}

export type MessageDTO = {
  count: number
  rows: [
    {
      id: number
      text: string
      userId: number
      topicId: number
      createdAt?: string
      updatedAt?: string
      answers?: AnswerDTO
      reactions?: ReactionDTO
      user: {
        id: number
        externalId: number
        name: string
        avatar?: string | null
        createdAt?: string
        updatedAt?: string
      }
    }
  ]
}

export type AnswerInputDTO = {
  text: string
  userId: number
  messageId: number
}

export type AnswerDTO = [
  {
    id: number
    text: string
    userId: number
    messageId: number
    createdAt?: string
    updatedAt?: string
    user: {
      id: number
      externalId: number
      name: string
      avatar?: string | null
      createdAt?: string
      updatedAt?: string
    }
  }
]

export type ReactionInputDTO = {
  label: string
  messageId: number
}

export type ReactionDTO = [
  {
    id: number
    label: string
    createdAt?: string
    updatedAt?: string
    messageId: number
  }
]

export type ForumUserDTO = {
  externalId: number
  name: string
  avatar?: string | null
}

export type ForumErrorDTO = {
  message: string
}
