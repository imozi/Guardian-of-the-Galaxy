import React, { FC } from 'react'
import './Layout.scss'

type LayoutProps = {
  children: React.ReactNode
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <div className="layout__back">
        <img src="/images/back.jpg" />
      </div>
      <div className="layout__images">
        <img src="/images/planets.png" />
      </div>
      <main>{children}</main>
    </div>
  )
}
