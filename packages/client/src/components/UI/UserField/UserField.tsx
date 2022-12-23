import React, { AllHTMLAttributes, FC } from 'react'

type UserFieldProps = {
  number?: number
  author: string
  avatar: string
  score?: number
} & AllHTMLAttributes<HTMLDivElement>

export const UserField: FC<UserFieldProps> = ({
  number,
  author,
  avatar,
  score,
}) => {
  return (
    <div className="user-field">
      {number && <div className="user-field__number">{number}</div>}
      <img src={avatar} alt="avatar" className="user-field__photo" />
      <div className="user-field__name">{author}</div>
      {score && <p className="user-field__score">{score}</p>}
    </div>
  )
}
