export type UserType = {
  id: number
  login: string
  firstName: string
  secondName: string
  displayName: string
  avatar: string
  phone: string
  email: string
}

export type LeaderBoardItemType = {
  username: string
  avatar: string
  score: number
}

export type PasswordChange = {
  oldPassword: string
  newPassword: string
}
