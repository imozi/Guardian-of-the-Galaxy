import React, { FC } from 'react'
import './Card.scss'

type CardProps = {
  title: string
  children: React.ReactNode
  className?: string
}

export const Card: FC<CardProps> = ({ children, title, className }) => {
  return (
    <article className={`card ${className}`}>
      <h2 className="card__title">{title}</h2>
      {children}
    </article>
  )
}
