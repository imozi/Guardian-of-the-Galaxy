import React, { FC, useState } from 'react'
import { TIMER_TIME } from '../../utils/consts'

type TimerProps = {
  value: number | string
}

export const Timer: FC<TimerProps> = ({ value }) => {
  const [count, setCount] = useState(value)
  const counter = (): number | string  => {
    
    if (typeof count === 'number' && count > 0) {
      setTimeout(() => {
        setCount(count - 1)
      }, TIMER_TIME)
    } 

    if (count === 0) {
      setTimeout(() => {
        setCount("beginning of the game")
      }, TIMER_TIME)
    }   

    return count
  }

  return (
    <div className={typeof count === 'string' ? 'timer timer__fz-text' : 'timer' }>
      {counter()}
    </div>
  )
}
