export type ThemeDTO = {
  id: number
  name: string
  createdAt?: string
  updatedAt?: string
}

export type TopicDTO = {
  id: number
  name: string
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
  count: number,
  rows: 
    [
      {
        id: number
        text: string
        userId: number
        topicId: number
        createdAt?: string
        updatedAt?: string
        User: {
          id: number,
          externalId: number
          name: string
          avatar?: string | null
          createdAt?: string
          updatedAt?: string
        }
      }
    ]
}

export type ForumUserDTO = {
  externalId: number
  name: string
  avatar?: string | null
}

export type ForumErrorDTO = {
  message: string
}