import React, { FC, useState } from 'react'

type TimerProps = {
  value: number | string
}

export const Timer: FC<TimerProps> = ({ value }) => {

  const [count, setCount] = useState(value)

  const counter = (): number | string  => {
    
    if (count > 0 && typeof count === 'number') {
      setTimeout(() => {
        setCount(count - 1)
      }, 1500)
    } 

    if (count === 0) {
      setTimeout(() => {
        setCount("beginning of the game")
      }, 1500)
    }   

    return count
  }

  return (
    <div className={count > -1 ? 'timer' : 'timer timer__fz-text' }>
      {counter()}
    </div>
  )
}
