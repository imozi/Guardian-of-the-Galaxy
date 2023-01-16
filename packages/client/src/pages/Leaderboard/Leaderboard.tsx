import { useNavigate } from 'react-router-dom'
import { Page } from '@/components/Page'
import { UserField } from '@/components/UI'
import { useAppSelector } from '@/store'
import {
  useAddScoreMutation,
  useGetLeaderboardQuery,
} from '@/store/leaderboard/leaderboard.api.'
import { UserType } from '@/types'
import { TEAM_NAME } from '@/core/consts'
import { Loader } from '@/components/UI/Loader'

export const Leaderboard = () => {
  const navigate = useNavigate()

  const {
    data: leaderboard,
    isLoading,
    isFetching,
    refetch,
  } = useGetLeaderboardQuery()
  const loading = isLoading || isFetching

  //TODO удалить после реализации игры
  //Временное добавление своего результата в лидерборд(запись обновляется только если новый результат выше предыдущего)
  const user = useAppSelector(state => state.userState.user) as UserType
  const [addScore] = useAddScoreMutation()
  const onAddClick = async () => {
    await addScore({
      data: {
        username: user.displayName || user.firstName,
        avatar: user.avatar,
        score: 960,
      },
      teamName: TEAM_NAME,
      ratingFieldName: 'score',
    })

    refetch()
  }

  return (
    <Page title="Leaderboard">
      <section className="leaderboard">
        <h2 className="leaderboard__title">Leaderboard</h2>
        <div className="leaderboard__wrapper">
          <div className="leaderboard__links">
            <a className="link" onClick={() => navigate(-1)}>
              Back
            </a>
            <a className="link" onClick={onAddClick}>
              Add
            </a>
          </div>
          <div className="leaderboard__user-field">
            <div className="leaderboard__names">
              <h3 className="leaderboard__name">USERS</h3>
              <h3 className="leaderboard__name">SCORES</h3>
            </div>
            {loading && (
              <div className="leaderboard__loader">
                <Loader />
              </div>
            )}
            {leaderboard &&
              leaderboard.map(({ username, avatar, score }, i) => (
                <UserField
                  key={i}
                  number={i + 1}
                  author={username}
                  avatar={avatar}
                  score={score}></UserField>
              ))}
          </div>
        </div>
      </section>
    </Page>
  )
}
