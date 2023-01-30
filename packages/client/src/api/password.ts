import axios from 'axios'
import { API_URL } from '@/core/consts'
import type { PasswordChange } from '@/types'

export const passwordChange = (data: PasswordChange) => {
  return axios.post(`${API_URL}/user/password`, data)
}
