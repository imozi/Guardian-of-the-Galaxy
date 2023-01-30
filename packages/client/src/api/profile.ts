import axios from 'axios'
import { API_URL } from '@/core/consts'
import { UserDTO } from '@/types/api/ya.praktikum'

export const updateAvatar = (data: FormData): Promise<UserDTO> => {
  return axios.put(`${API_URL}/user/profile/avatar`, data)
}
