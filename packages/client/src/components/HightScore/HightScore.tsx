import { FC } from 'react'

type HightScoreProps = {
  score: number
}

export const HightScore: FC<HightScoreProps> = ({ score }) => {
  return (
    <div className="hight-score">
      <p className="hight-score__title">Hight score</p>
      <p className="hight-score__number">{score}</p>
    </div>
  )
}
