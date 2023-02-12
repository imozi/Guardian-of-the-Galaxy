import { YA_API_URL } from '@/core/consts'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userApi } from '../user/user.api'
import {
  resetUser,
  setUser,
  setServiceIdUser,
  setIsAuthUser,
} from '../user/userSlice'
import { apiDefaultHeaders } from '@/core/utils'
import { UserType } from '@/types'
import {
  AuthDTO,
  ErrorDTO,
  IGetYandexServiceIDModel,
  IYandexSigninModel,
} from '@/types/api/ya.praktikum'
import 'cross-fetch/polyfill'
import { forumApi } from '../forum/forum.api'

export const authApi = createApi({
  reducerPath: 'auth/api',
  baseQuery: fetchBaseQuery({
    baseUrl: YA_API_URL,
    credentials: 'include',
    fetchFn: fetch,
  }),
  endpoints: build => ({
    authLogin: build.mutation<string | ErrorDTO, AuthDTO>({
      query: data => ({
        ...apiDefaultHeaders,
        url: `/auth/signin`,
        method: 'POST',
        body: JSON.stringify(data),
        responseHandler: response => response.text(),
      }),
      transformErrorResponse: response => JSON.parse(response.data as string),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            userApi.endpoints.getUser.initiate(undefined, {
              forceRefetch: true,
            })
          )
        } catch (error) {
          console.log(error)
        }
      },
    }),
    authRegister: build.mutation<string | ErrorDTO, AuthDTO>({
      query: data => ({
        ...apiDefaultHeaders,
        url: `/auth/signup`,
        method: 'POST',
        query: JSON.stringify(data),
      }),
      transformErrorResponse: response => response.data,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          const { data } = await dispatch(
            userApi.endpoints.getUser.initiate(undefined, {
              forceRefetch: true,
            })
          )
          const { id, firstName, avatar } = data as UserType
          dispatch(
            forumApi.endpoints.addUser.initiate({
              externalId: id,
              name: firstName,
              avatar,
            })
          )
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
    getOAuthYandexServiceId: build.mutation<string, IGetYandexServiceIDModel>({
      query: data => {
        const { redirect_uri } = data
        return {
          ...apiDefaultHeaders,
          url: `/oauth/yandex/service-id`,
          params: { redirect_uri },
        }
      },
      transformErrorResponse: response => JSON.parse(response.data as string),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log(data)
          dispatch(setServiceIdUser(data))
        } catch (error) {
          console.log(error)
        }
      },
    }),
    signinWithOAuthYandex: build.mutation<string, IYandexSigninModel>({
      query: data => ({
        ...apiDefaultHeaders,
        url: `/oauth/yandex`,
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
          dispatch(setIsAuthUser({ isAuth: true }))
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
