import { useRef, useEffect } from 'react'

export function useDocumentTitle(title: string, prevailOnUnmount = false) {
  const defaultTitle = useRef(document?.title)

  useEffect(() => {
    if (document) {
      document.title = title
    }
  }, [title])

  useEffect(
    () => () => {
      if (!prevailOnUnmount && document) {
        document.title = defaultTitle.current
      }
    },
    [prevailOnUnmount]
  )
}
