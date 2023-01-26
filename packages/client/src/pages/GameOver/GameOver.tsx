import { Link, Navigate, useLocation } from 'react-router-dom'
import { Page } from '@/components/Page'
import { CurrentLevel } from '@/components/CurrentLevel'
import { CurrentScore } from '@/components/CurrentScore'
import { HightScore } from '@/components/HightScore'

type stateGame = {
  state: {
    level: number
    score: number
    hightScore: number
  }
}

export const GameOver = () => {
  const { state }: stateGame = useLocation()

  if (!state) {
    return <Navigate to="/" />
  }

  const { level, score, hightScore } = state

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
