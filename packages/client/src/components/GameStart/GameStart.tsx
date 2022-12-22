import React, { useEffect, useState } from 'react'
import { TIMER_START, TIMER_TIME } from '../../utils/consts'
import { GameBoard } from '../GameBoard'
import { useCountdown } from '../../hooks/useCountdown'

export const GameStart = () => {
  const count = useCountdown(TIMER_START)
  const [isTimerStart, setIsTimerStart] = useState(true)
  const [isGameStart, setIsGameStart] = useState(false)

  useEffect(() => {
    if (count !== 0) {
      return
    }

    setTimeout(() => {
      setIsGameStart(true)
    }, TIMER_TIME + TIMER_TIME / 3)

    setTimeout(() => {
      setIsTimerStart(false)
    }, TIMER_TIME)
  }, [count])

  return (
    <>
      {isTimerStart && <div className="timer">{count ? count : 'GO'}</div>}
      {isGameStart ? (
        <GameBoard />
      ) : (
        <>
          <div className="game__ship"></div>
          <div className="game__overlay"></div>
        </>
      )}
    </>
  )
}
