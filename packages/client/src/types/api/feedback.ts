export type Coords = {
  longitude: number | string
  latitude: number | string
}

export type FeedbackInputDTO = {
  message: string
  coords: Coords | null
}

export type FeedbackErrorDTO = {
  message: string
}
