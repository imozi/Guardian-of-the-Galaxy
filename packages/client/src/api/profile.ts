import axios from 'axios'
import { API_URL } from '../utils/consts'
import { UserDTO } from './types'

export const updateAvatar = (data: FormData): Promise<UserDTO> => {
  return axios.put(`${API_URL}/user/profile/avatar`, data)
}
