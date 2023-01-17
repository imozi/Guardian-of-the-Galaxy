import { FC, useEffect, useState } from 'react'
import { TIMER_START, TIMER_TIME } from '@/core/consts'
import { useCountDown } from '@/hooks'

type GameStartProps = {
  callback: () => void
}

export const GameStartTimer: FC<GameStartProps> = ({ callback }) => {
  const count = useCountDown(TIMER_START)
  const [isTimerStart, setIsTimerStart] = useState(true)

  useEffect(() => {
    if (count !== 0) {
      return
    }

    setTimeout(() => {
      setIsTimerStart(false)
      callback()
    }, TIMER_TIME)
  }, [callback, count])

  return (
    <>
      {isTimerStart && (
        <div className="game-start-timer">
          <span className="game-start-timer__count">
            {count ? count : 'GO'}
          </span>
          <div className="game-start-timer__overlay"></div>
        </div>
      )}
    </>
  )
}
