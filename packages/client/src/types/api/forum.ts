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

export type ForumUserDTO = {
  externalId: number
  name: string
  avatar?: string | null
}

export type ForumErrorDTO = {
  message: string
}