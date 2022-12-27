import { UserType } from '../types/user'
import { UserTypeDTO } from '../types/api'

export const transformUser = (data: UserTypeDTO): UserType => ({
  id: data.id,
  login: data.login,
  firstName: data.first_name,
  secondName: data.second_name,
  displayName: data.display_name,
  avatar: data.avatar,
  phone: data.phone,
  email: data.email,
  role: data.role === 'admin' ? 'admin' : 'user',
})
