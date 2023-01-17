import { FC } from 'react'

type CurrentLevelProps = {
  level: number
}

export const CurrentLevel: FC<CurrentLevelProps> = ({ level }) => {
  return (
    <div className="current-level">
      <p className="current-level__title">Level</p>
      <p className="current-level__number">{level}</p>
    </div>
  )
}
