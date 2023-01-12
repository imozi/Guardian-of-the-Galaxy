import { TIMER_TIME } from '@/core/consts'
import { useEffect, useState } from 'react'


export const useCountDown = (startValue: number) => {
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
