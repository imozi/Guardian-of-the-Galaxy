import { useNavigate } from 'react-router-dom'
import { Page } from '@/components/Page'
import { UserField } from '@/components/UI'
import { useGetLeaderboardQuery } from '@/store/leaderboard/leaderboard.api'

import { Loader } from '@/components/UI/Loader'
import { Card } from '@/components/Card'

export const Leaderboard = () => {
  const navigate = useNavigate()

  const { data: leaderboard, isLoading, isFetching } = useGetLeaderboardQuery()
  const loading = isLoading || isFetching

  return (
    <Page title="Leaderboard">
      <section className="profile leaderboard">
        <h2 className="profile__title">Leaderboard</h2>
        <div className="profile__wrapper">
          <div className="profile__nav">
            <a className="link" onClick={() => navigate(-1)}>
              Back
            </a>
          </div>
          <Card>
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
                    score={score}
                  />
                ))}
            </div>
          </Card>
        </div>
      </section>
    </Page>
  )
}
