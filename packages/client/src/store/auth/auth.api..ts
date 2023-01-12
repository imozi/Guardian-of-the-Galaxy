import { AuthDTO, ErrorDTO } from '@/types/api/ya.praktikum'
import { API_URL } from '@/core/consts'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userApi } from '../user/user.api'
import { resetUser } from '../user/userSlice'


export const authApi = createApi({
  reducerPath: 'auth/api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: build => ({
    authLogin: build.mutation<string | ErrorDTO, AuthDTO>({
      query: data => ({
        url: `/auth/signin`,
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
        responseHandler: response => response.text(),
      }),
      transformErrorResponse: response => JSON.parse(response.data as string),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          await dispatch(userApi.endpoints.getUser.initiate())
        } catch (error) {
          console.log(error)
        }
      },
    }),
    authRegister: build.mutation<string | ErrorDTO, AuthDTO>({
      query: data => ({
        url: `/auth/signup`,
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
      }),
      transformErrorResponse: response => response.data,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          await dispatch(userApi.endpoints.getUser.initiate())
        } catch (error) {
          console.log(error)
        }
      },
    }),
    authLogout: build.mutation<string | ErrorDTO, void>({
      query: () => ({
        url: `/auth/logout`,
        method: 'POST',
        credentials: 'include',
        responseHandler: response => response.text(),
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(resetUser())
        } catch (error) {
          console.log(error)
        }
      },
    }),
  }),
})

export const {
  useAuthLoginMutation,
  useAuthRegisterMutation,
  useAuthLogoutMutation,
} = authApi
