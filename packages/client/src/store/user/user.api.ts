import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setUser } from './userSlice'
import { API_URL } from '@/core/consts'
import { transformUser } from '@/core/utils'
import { UserType } from '@/types'
import { ErrorDTO, PasswordDTO, UserDTO } from '@/types/api/ya.praktikum'


export const userApi = createApi({
  reducerPath: 'user/api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: build => ({
    getUser: build.query<UserType, void>({
      query: () => ({
        url: `/auth/user`,
        credentials: 'include',
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
        url: `/user/profile`,
        method: 'PUT',
        body: data,
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
      }),
      transformResponse: (response: UserDTO) => transformUser(response),
      transformErrorResponse: response => response.data,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data as UserType))
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
        credentials: 'include',
      }),
      transformResponse: (response: UserDTO) => transformUser(response),
      transformErrorResponse: response => response.data,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data as UserType))
        } catch (error) {
          console.log(error)
        }
      },
    }),
    updatePassword: build.mutation<string | ErrorDTO, PasswordDTO>({
      query: data => ({
        url: `/user/password`,
        method: 'PUT',
        body: data,
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
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
