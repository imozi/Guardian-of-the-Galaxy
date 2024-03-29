import { Link, Navigate, useLocation } from 'react-router-dom'
import { Page } from '@/components/Page'
import { CurrentLevel } from '@/components/CurrentLevel'
import { CurrentScore } from '@/components/CurrentScore'
import { HightScore } from '@/components/HightScore'
import { UserType } from '@/types'
import { useAppSelector } from '@/store'
import { useAddScoreMutation } from '@/store/leaderboard/leaderboard.api'
import { TEAM_NAME } from '@/core/consts'
import { useEffect } from 'react'

type stateGame = {
  state: {
    level: number
    score: number
    hightScore: number
  }
}

export const GameOver = () => {
  const { state }: stateGame = useLocation()
  const [addScore] = useAddScoreMutation()

  if (!state) {
    return <Navigate to="/" />
  }

  const { level, score, hightScore } = state
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const user = useAppSelector(state => state.userState.user) as UserType

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!user) {
      return
    }

    const { displayName, firstName, avatar } = user

    addScore({
      data: {
        username: displayName || firstName,
        avatar,
        score: hightScore,
      },
      teamName: TEAM_NAME,
      ratingFieldName: 'score',
    })
  }, [user, addScore, hightScore])

  return (
    <Page title="Game Over" isGame={true}>
      <section className="game-over">
        <div className="game-over__stat">
          <CurrentLevel level={level} />
          <CurrentScore score={score} />
          <HightScore score={hightScore} />
        </div>
        <div className="game-over__wrapper">
          <h1 className="game-over__title">Game Over</h1>
          <div className="game-over__buttons">
            <Link className="link" to="/game">
              Retry
            </Link>
            <Link className="link" to="/">
              Home
            </Link>
          </div>
        </div>
      </section>
    </Page>
  )
}
