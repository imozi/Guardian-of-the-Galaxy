import React, { FC } from 'react'

type CardProps = {
  title?: string
  children: React.ReactNode
  className?: string
}

export const Card: FC<CardProps> = ({ children, title, className }) => {
  let cardClass = 'card'
  if (className) {
    cardClass = ` ${className}`
  }
  return (
    <article className={cardClass}>
      {!!title && <h2 className="card__title">{title}</h2>}
      {children}
    </article>
  )
}
