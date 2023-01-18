import { useRef, useEffect } from 'react'
import { isBrowser } from '@/core/utils/isBrowser'

export function useDocumentTitle(title: string, prevailOnUnmount = false) {
  const defaultTitle = useRef(document?.title)

  useEffect(() => {
    if (isBrowser()) {
      document.title = title
    }
  }, [title])

  useEffect(
    () => () => {
      if (isBrowser() && !prevailOnUnmount) {
        document.title = defaultTitle.current
      }
    },
    [prevailOnUnmount]
  )
}
