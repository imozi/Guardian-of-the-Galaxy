import { API_URL } from '../utils/consts'
import { AuthDTO } from './types'
import axios from 'axios'



export const register = (data: AuthDTO) => {
  return axios.post(`${API_URL}/auth/signup`, data)
}

export const login = (data: AuthDTO) => {
  return axios.post(`${API_URL}/auth/signin`, data)
}

export const logout = () => {
  return axios.post(`${API_URL}/auth/logout`)
}
