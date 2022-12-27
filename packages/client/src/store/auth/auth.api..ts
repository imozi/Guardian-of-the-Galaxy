import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../utils/consts'
import { ErrorDTO } from '../../types/api'
import { userApi } from '../user/user.api'

export const authApi = createApi({
  reducerPath: 'auth/api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: build => ({
    authLogin: build.mutation<string | ErrorDTO, string>({
      query: data => ({
        url: `/auth/signin`,
        method: 'POST',
        body: data,
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
    authRegister: build.mutation<string | ErrorDTO, string>({
      query: data => ({
        url: `/auth/signup`,
        method: 'POST',
        body: data,
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
  }),
})

export const { useAuthLoginMutation, useAuthRegisterMutation } = authApi
