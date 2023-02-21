import { AllHTMLAttributes, FC } from 'react'
import { API_RESOURCES_URL, USER_AVATAR_DEFAULT } from '@/core/consts'
import { UserFieldProps } from '@/types/components/field'

export const UserField: FC<
  UserFieldProps & AllHTMLAttributes<HTMLDivElement>
> = ({ number, author, avatar, score }) => {
  return (
    <div className="user-field">
      {number && <div className="user-field__number">{number}</div>}
      <img
        src={avatar ? `${API_RESOURCES_URL}/${avatar}` : USER_AVATAR_DEFAULT}
        alt="avatar"
        className="user-field__photo"
      />
      <div className="user-field__name">{author}</div>
      {score && <p className="user-field__score">{score}</p>}
    </div>
  )
}
