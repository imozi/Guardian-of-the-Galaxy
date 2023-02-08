import { apiDefaultHeaders } from '@/core/utils'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import 'cross-fetch/polyfill'
import {
  ForumErrorDTO,
  ForumUserDTO,
  TopicDTO,
  TopicInputDTO,
} from '@/types/api/forum'
import { API_SERVER_URL } from '@/core/consts'

export const forumApi = createApi({
  reducerPath: 'forum/api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_SERVER_URL,
    ...apiDefaultHeaders,
    fetchFn: fetch,
  }),
  endpoints: build => ({
    getTopics: build.query<TopicDTO[], void>({
      query: () => ({
        url: `/topic`,
        method: 'GET',
      }),
      transformErrorResponse: response => response.data,
    }),
    getTopic: build.query<TopicDTO, string | undefined>({
      query: id => ({
        url: `/topic/${id}`,
        method: 'GET',
      }),
      transformErrorResponse: response => response.data,
    }),
    addTopic: build.mutation<TopicDTO | ForumErrorDTO, TopicInputDTO>({
      query: data => ({
        url: `/topic`,
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: response => response.data,
    }),
    addUser: build.mutation<ForumUserDTO | ForumErrorDTO, ForumUserDTO>({
      query: data => ({
        url: `/user`,
        method: 'POST',
        body: data,
      }),
    }),
    updateUser: build.mutation<ForumUserDTO | ForumErrorDTO, ForumUserDTO>({
      query: ({ externalId, ...payload }) => ({
        url: `/user/${externalId}`,
        method: 'PUT',
        body: payload,
      }),
    }),
    updateTheme: build.mutation<ForumUserDTO | ForumErrorDTO, ForumUserDTO>({
      query: ({ externalId, ...payload }) => ({
        url: `/user/${externalId}/theme`,
        method: 'PUT',
        body: payload,
      }),
    }),
  }),
})

export const {
  useGetTopicsQuery,
  useGetTopicQuery,
  useAddTopicMutation,
  useAddUserMutation,
  useUpdateUserMutation,
} = forumApi
