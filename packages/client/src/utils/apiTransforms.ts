import { UserDTO } from '../types/api'
import { UserType } from '../types/user'

export const transformUser = (data: UserDTO): UserType => ({
  id: data.id,
  login: data.login,
  firstName: data.first_name,
  secondName: data.second_name,
  displayName: data.display_name,
  avatar: data.avatar,
  phone: data.phone,
  email: data.email,
  role: data.role,
})
