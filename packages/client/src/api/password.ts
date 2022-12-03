import { API_URL } from '../utils/consts'
import { PasswordChange } from './types'
import axios from 'axios'

export const passwordChange = (data: PasswordChange) => {
  return axios.post(`${API_URL}/user/password`, data)
}
