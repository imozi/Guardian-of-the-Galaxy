import { API_URL } from '@/core/consts'
import { apiDefaultHeaders } from '@/core/utils'
import {
  AnswerDTO,
  AnswerInputDTO,
  ForumErrorDTO,
  ForumUserDTO,
  MessageDTO,
  MessageInputDTO,
  ReactionDTO,
  ReactionInputDTO,
  TopicDTO,
  TopicInputDTO,
} from '@/types/api/forum'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import 'cross-fetch/polyfill'

export const forumApi = createApi({
  reducerPath: 'forum/api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
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
    getMessages: build.query<MessageDTO, string | undefined>({
      query: topicId => ({
        url: `/message/${topicId}`,
        method: 'GET',
      }),
      transformErrorResponse: response => response.data,
    }),
    addMessage: build.mutation<MessageDTO | ForumErrorDTO, MessageInputDTO>({
      query: data => ({
        url: `/message`,
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: response => response.data,
    }),
    addReaction: build.mutation<ReactionDTO | ForumErrorDTO, ReactionInputDTO>({
      query: data => ({
        url: `/reaction`,
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: response => response.data,
    }),
    addAnswer: build.mutation<AnswerDTO | ForumErrorDTO, AnswerInputDTO>({
      query: data => ({
        url: `/answer`,
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: response => response.data,
    }),
  }),
})

export const {
  useGetTopicsQuery,
  useGetTopicQuery,
  useAddTopicMutation,
  useAddUserMutation,
  useUpdateUserMutation,
  useGetMessagesQuery,
  useAddMessageMutation,
  useAddReactionMutation,
  useAddAnswerMutation,
} = forumApi
