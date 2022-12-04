import React, { AllHTMLAttributes, FC } from 'react'

type UserFieldProps = {
  number: number
  author: string
  avatar: string
  score: number
} & AllHTMLAttributes<HTMLDivElement>

export const UserField: FC<UserFieldProps> = ({ ...props }) => {
  return (
    <div className="user-field">
      <div className="user-field__number">
        {props.number}
      </div>
      <img src={props.avatar} alt="avatar" className="user-field__photo" />
      <div className="user-field__name">{props.author}</div>
      <p className="user-field__score">{props.score}</p>
    </div>
  )
}
