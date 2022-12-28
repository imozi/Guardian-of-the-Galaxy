import React, { FC } from 'react'
import { API_RESOURCES_URL } from '../../utils/consts'

type AvatarProps = {
  src?: string
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void
  loading?: boolean
}

export const Avatar: FC<AvatarProps> = ({ src, onChange, loading }) => {
  let className = 'avatar'
  if (loading) {
    className += ' avatar--loading'
  }
  return (
    <div className={className}>
      <label htmlFor="avatar" className="avatar__img" data-loading="false">
        <img
          src={src ? `${API_RESOURCES_URL}/${src}` : '/images/user-default.svg'}
          alt="avatar"
        />
        <input
          id="avatar"
          type="file"
          className="visually-hidden"
          onChange={onChange}
        />
      </label>
    </div>
  )
}
