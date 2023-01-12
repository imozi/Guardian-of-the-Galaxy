import { AllHTMLAttributes, FC } from 'react'
import { API_RESOURCES_URL } from '@/core/consts'
import { UserFieldProps } from '@/types/components/field'

export const UserField: FC<
  UserFieldProps & AllHTMLAttributes<HTMLDivElement>
> = ({ number, author, avatar, score }) => {
  return (
    <div className="user-field">
      {number && <div className="user-field__number">{number}</div>}
      <img
        src={
          avatar ? `${API_RESOURCES_URL}/${avatar}` : '/images/user-default.svg'
        }
        alt="avatar"
        className="user-field__photo"
      />
      <div className="user-field__name">{author}</div>
      {score && <p className="user-field__score">{score}</p>}
    </div>
  )
}
