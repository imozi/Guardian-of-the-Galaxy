import axios from 'axios'
import { API_URL } from '@/core/consts'
import type { AuthDTO } from '@/types/api/ya.praktikum'

export const register = (data: AuthDTO) => {
  return axios.post(`${API_URL}/auth/signup`, data)
}

export const login = (data: AuthDTO) => {
  return axios.post(`${API_URL}/auth/signin`, data)
}

export const logout = () => {
  return axios.post(`${API_URL}/auth/logout`)
}
