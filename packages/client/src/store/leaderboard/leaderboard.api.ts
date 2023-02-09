import {
  API_URL,
  LEADERBOARD_DEFAULT_PAGE,
  LEADERBOARD_LIMIT_PAGE,
  TEAM_NAME,
} from '@/core/consts'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  ErrorDTO,
  LeaderboardDTO,
  LeaderboardItemDTO,
} from '@/types/api/ya.praktikum'
import { LeaderBoardItemType } from '@/types'
import { transformLeaderboard } from '@/core/utils/apiTransforms'
import { apiDefaultHeaders } from '@/core/utils'
import 'cross-fetch/polyfill'

export const leaderboardApi = createApi({
  reducerPath: 'leaderboard/api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/ya`,
    ...apiDefaultHeaders,
    credentials: 'include',
    fetchFn: fetch,
  }),
  endpoints: build => ({
    getLeaderboard: build.query<LeaderBoardItemType[], void>({
      query: () => ({
        url: `/leaderboard/${TEAM_NAME}`,
        method: 'POST',
        body: {
          ratingFieldName: 'score',
          cursor: LEADERBOARD_DEFAULT_PAGE,
          limit: LEADERBOARD_LIMIT_PAGE,
        },
      }),
      transformResponse: (response: LeaderboardDTO) =>
        transformLeaderboard(response),
      transformErrorResponse: response => response.data,
    }),
    addScore: build.mutation<string | ErrorDTO, LeaderboardItemDTO>({
      query: data => ({
        url: `/leaderboard`,
        method: 'POST',
        body: data,
        responseHandler: response => response.text(),
      }),
      transformErrorResponse: response => JSON.parse(response.data as string),
    }),
  }),
})

export const { useAddScoreMutation, useGetLeaderboardQuery } = leaderboardApi
