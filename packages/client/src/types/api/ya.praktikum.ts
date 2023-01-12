export type AuthDTO = {
  login: string
  password: string
  first_name?: string
  second_name?: string
  phone?: string
  email?: string
}

export type ErrorDTO = {
  reason: string
}

export type PasswordDTO = {
  newPassword: string
  oldPassword: string
}

export type UserDTO = {
  id: number
  login: string
  first_name: string
  second_name: string
  display_name: string
  avatar: string
  phone: string
  email: string
  role?: string
}
