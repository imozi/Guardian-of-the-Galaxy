import { AuthDTO, ErrorDTO } from '@/types/api/ya.praktikum'
import { API_URL } from '@/core/consts'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userApi } from '../user/user.api'
import { resetUser, setUser } from '../user/userSlice'
import { apiDefaultHeaders } from '@/core/utils'
import fetch from 'cross-fetch'
import { UserType } from '@/types'
import 'cross-fetch/polyfill'
import YandexAuth from '@/api/oauth'

export const authApi = createApi({
  reducerPath: 'auth/api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
    fetchFn: fetch,
  }),
  endpoints: build => ({
    authLogin: build.mutation<string | ErrorDTO, AuthDTO>({
      query: data => ({
        ...apiDefaultHeaders(),
        url: `/auth/signin`,
        method: 'POST',
        body: JSON.stringify(data),
        responseHandler: response => response.text(),
      }),
      transformErrorResponse: response => JSON.parse(response.data as string),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          const { data } = await dispatch(userApi.endpoints.getUser.initiate())
          dispatch(setUser(data as UserType))
        } catch (error) {
          console.log(error)
        }
      },
    }),
    authRegister: build.mutation<string | ErrorDTO, AuthDTO>({
      query: data => ({
        ...apiDefaultHeaders(),
        url: `/auth/signup`,
        method: 'POST',
        body: JSON.stringify(data),
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
    getOAuthYandexServiceId: build.mutation<string | ErrorDTO, void>({
      query: () => ({
        url: `/auth/yandexOAuthServiceId`,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await YandexAuth.getServiceID({ redirect_uri })
          return data
        } catch (error) {
          console.log(error)
        }
      },
    }),
    signinWithOAuthYandex: build.mutation<string | ErrorDTO, void>({
      query: () => ({
        url: `/auth/siginWithYandexOAuth`,
        method: 'POST',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await YandexAuth.signin(params)
          return data
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
  useGetOAuthYandexServiceIdMutation,
  useSigninWithOAuthYandexMutation,
} = authApi
