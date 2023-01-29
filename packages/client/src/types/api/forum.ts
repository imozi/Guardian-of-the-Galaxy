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
  id: number
  name: string
  avatar?: string
}

export type ForumErrorDTO = {
  message: string
}