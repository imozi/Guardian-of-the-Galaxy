import { FC, useEffect } from 'react'
import { fullscreenAPI } from '@/core/utils/webAPI'
import { useDocumentTitle } from '@/hooks'

type PageProps = {
  title: string
  children: React.ReactNode
  isGame?: boolean
}

export const Page: FC<PageProps> = ({ title, children, isGame = false }) => {
  const prefix = 'GOTG | '

  useDocumentTitle(`${prefix}${title}`)

  useEffect(() => {
    if (document) {
      fullscreenAPI()
    }
  }, [])

  return (
    <main className="page" data-game={isGame}>
      {children}
    </main>
  )
}
