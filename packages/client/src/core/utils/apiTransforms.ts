import { LeaderboardDTO, UserDTO } from '@/types/api/ya.praktikum'
import { LeaderBoardItemType, UserType } from '@/types'

export const transformUser = (data: UserDTO): UserType => ({
  id: data.id,
  login: data.login,
  firstName: data.first_name,
  secondName: data.second_name,
  displayName: data.display_name,
  avatar: data.avatar,
  phone: data.phone,
  email: data.email,
})

export const transformLeaderboard = (
  leaderboard: LeaderboardDTO
): LeaderBoardItemType[] => leaderboard.map(({ data }) => data)
