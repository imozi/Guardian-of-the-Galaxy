import { FC } from 'react'

type CurrentScoreProps = {
  score: number
}

export const CurrentScore: FC<CurrentScoreProps> = ({ score }) => {
  return (
    <div className="current-score">
      <p className="current-score__title">Score:</p>
      <p className="current-score__number">{score}</p>
    </div>
  )
}
