import React, { FC } from 'react'

type LayoutProps = {
  children: React.ReactNode
  isGame?: boolean
}

export const Layout: FC<LayoutProps> = ({ children, isGame }) => {
  let className = 'layout'

  if (isGame) {
    className += ' game'
  }

  return (
    <div className={className}>
      <main className="layout__main">{children}</main>
    </div>
  )
}
