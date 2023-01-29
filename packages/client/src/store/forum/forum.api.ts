import { API_SERVER_URL } from '@/core/consts'
import { apiDefaultHeaders } from '@/core/utils'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import 'cross-fetch/polyfill'
import { TopicDTO, TopicInputDTO } from '@/types/api/forum'

export const forumApi = createApi({
  reducerPath: 'forum/api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_SERVER_URL,
    ...apiDefaultHeaders(),
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
    getTopic: build.query<TopicDTO[], string | undefined>({
      query: id => ({
        url: `/topic/${id}`,
        method: 'GET',
      }),
      transformErrorResponse: response => response.data,
    }),
    addTopic: build.mutation<TopicDTO, TopicInputDTO>({
      query: data => ({
        url: `/topic`,
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: response => response.data,
    }),
  }),
})

export const { useGetTopicsQuery, useGetTopicQuery, useAddTopicMutation } =
  forumApi
