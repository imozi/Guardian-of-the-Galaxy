import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setUser } from './userSlice'
import { API_URL } from '@/core/consts'
import { apiDefaultHeaders, transformUser } from '@/core/utils'
import { UserType } from '@/types'
import { ErrorDTO, PasswordDTO, UserDTO } from '@/types/api/ya.praktikum'
import 'cross-fetch/polyfill'
import { forumApi } from '@/store/forum/forum.api'

export const userApi = createApi({
  reducerPath: 'user/api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
    fetchFn: fetch,
  }),
  endpoints: build => ({
    getUser: build.query<UserType, void>({
      query: () => ({
        url: `/auth/user`,
      }),
      transformResponse: (response: UserDTO) => transformUser(response),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data))
        } catch (error) {
          console.log(error)
        }
      },
    }),
    updateUser: build.mutation<UserType | ErrorDTO, UserDTO>({
      query: data => ({
        ...apiDefaultHeaders(),
        url: `/user/profile`,
        method: 'PUT',
        body: data,
      }),
      transformResponse: (response: UserDTO) => transformUser(response),
      transformErrorResponse: response => response.data,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const { id, firstName, displayName, avatar } = data as UserType
          dispatch(setUser(data as UserType))
          dispatch(forumApi.endpoints.updateUser.initiate({
            externalId: id,
            name: displayName || firstName,
            avatar,
          }))
        } catch (error) {
          console.log(error)
        }
      },
    }),
    updateAvatar: build.mutation<UserType | ErrorDTO, FormData>({
      query: data => ({
        url: `/user/profile/avatar`,
        method: 'PUT',
        body: data,
      }),
      transformResponse: (response: UserDTO) => transformUser(response),
      transformErrorResponse: response => response.data,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const { id, firstName, displayName, avatar } = data as UserType
          dispatch(setUser(data as UserType))
          dispatch(forumApi.endpoints.updateUser.initiate({
            externalId: id,
            name: displayName || firstName,
            avatar,
          }))
        } catch (error) {
          console.log(error)
        }
      },
    }),
    updatePassword: build.mutation<string | ErrorDTO, PasswordDTO>({
      query: data => ({
        ...apiDefaultHeaders(),
        url: `/user/password`,
        method: 'PUT',
        body: data,
        responseHandler: response => response.text(),
      }),
      transformErrorResponse: response => JSON.parse(response.data as string),
    }),
  }),
})

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
  useUpdateAvatarMutation,
} = userApi
