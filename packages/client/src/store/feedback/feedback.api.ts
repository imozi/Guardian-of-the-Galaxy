import { apiDefaultHeaders } from '@/core/utils'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import 'cross-fetch/polyfill'
import { API_URL } from '@/core/consts'
import { FeedbackErrorDTO, FeedbackInputDTO } from '@/types/api/feedback'

export const feedbackApi = createApi({
  reducerPath: 'feedback/api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    ...apiDefaultHeaders,
    credentials: 'include',
    fetchFn: fetch,
  }),
  endpoints: build => ({
    addFeedback: build.mutation<FeedbackInputDTO, FeedbackErrorDTO >({
      query: data => ({
        url: `/feedback`,
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: response => response.data,
    })
})
})

export const {
  useAddFeedbackMutation,
} = feedbackApi
