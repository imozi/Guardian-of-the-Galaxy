import { useEffect, useState } from 'react'
import { TIMER_TIME } from '../utils/consts'

export const useCountdown = (startValue: number) => {
  const [countDown, setCountDown] = useState(startValue)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (countDown > 0) {
        setCountDown(countDown - 1)
      } else {
        clearTimeout(timeout)
      }
    }, TIMER_TIME)

    return () => clearTimeout(timeout)
  }, [countDown])

  return countDown
}
