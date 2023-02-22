import { LeaderboardDTO, UserDTO } from '@/types/api/ya.praktikum'
import { LeaderBoardItemType, UserType } from '@/types'
import { quickSort } from './quickSort'
import { LEADERBOARD_LIMIT_MAX_RESULT } from '../consts'

export const transformUser = (data: UserDTO): UserType => ({
  id: data.id,
  login: data.login,
  firstName: data.first_name,
  secondName: data.second_name,
  displayName: data.display_name || '',
  avatar: data.avatar,
  phone: data.phone,
  email: data.email,
})

export const transformLeaderboard = (
  leaderboard: LeaderboardDTO
): LeaderBoardItemType[] => {
  const data = leaderboard.map(({ data }) => {
    data.score = Number(data.score)
    return data
  })

  return quickSort<LeaderBoardItemType>(data, 'DESC', 'score').splice(
    0,
    LEADERBOARD_LIMIT_MAX_RESULT
  )
}
