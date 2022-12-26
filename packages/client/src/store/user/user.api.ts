import { ErrorDTO, UserTypeDTO } from '../../types/user'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../utils/consts'

export const userApi = createApi({
  reducerPath: 'user/api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: build => ({
    userAuth: build.query<UserTypeDTO | ErrorDTO, string>({
      query: () => ({
        url: `/auth/user`,
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
      }),
    }),
    userLogout: build.query<string | ErrorDTO, null>({
      query: () => ({
        url: `/auth/logout`,
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
      }),
    }),
  }),
})

export const { useUserAuthQuery, useUserLogoutQuery } = userApi
