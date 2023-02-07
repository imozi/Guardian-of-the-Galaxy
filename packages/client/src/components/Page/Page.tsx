import { FC, useEffect } from 'react'
import { fullscreenAPI } from '@/core/utils/webAPI'
import { useDocumentTitle } from '@/hooks'
import { isBrowser } from '@/core/utils/isBrowser'
import { useAppSelector } from '@/store'

type PageProps = {
  title: string
  children: React.ReactNode
  isGame?: boolean
}

export const Page: FC<PageProps> = ({ title, children, isGame = false }) => {
  const prefix = 'GOTG | '
  const theme = useAppSelector(state => state.userState.theme)

  useDocumentTitle(`${prefix}${title}`)

  useEffect(() => {
    if (isBrowser()) {
      fullscreenAPI()
    }
  }, [])

  return (
    <main className={`page page--${theme}`} data-game={isGame}>
      {children}
    </main>
  )
}
