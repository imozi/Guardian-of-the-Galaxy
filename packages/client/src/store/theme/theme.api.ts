import { apiDefaultHeaders } from '@/core/utils'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import 'cross-fetch/polyfill'
import { API_URL } from '@/core/consts'
import { UserThemeDTO } from '@/types/api/theme'
import { setUserTheme } from '@/store/user/userSlice'

export const themeApi = createApi({
  reducerPath: 'theme/api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
    ...apiDefaultHeaders,
    fetchFn: fetch,
  }),
  endpoints: build => ({
    getTheme: build.query<string, number>({
      query: id => ({
        url: `/user/${id}/theme`,
        method: 'GET',
      }),
      transformErrorResponse: response => response.data,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUserTheme(data))
        } catch (error) {
          console.log(error)
        }
      },
    }),
    updateTheme: build.mutation<string, UserThemeDTO>({
      query: ({ externalId, ...payload }) => ({
        url: `/user/${externalId}/theme`,
        method: 'PUT',
        body: payload,
      }),
      onQueryStarted({ themeName }, { dispatch }) {
        dispatch(setUserTheme(themeName))
      },
    }),
  }),
})

export const { useGetThemeQuery, useUpdateThemeMutation } = themeApi
