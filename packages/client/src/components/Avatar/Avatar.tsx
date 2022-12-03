import React, { FC } from 'react'

type AvatarProps = {
  src?: string
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void
}

export const Avatar: FC<AvatarProps> = ({ src, onChange }) => {
  return (
    <div className="avatar">
      <label htmlFor="avatar" className="avatar__img" data-loading="false">
        <img
          src={
            src
              ? `https://ya-praktikum.tech/api/v2/resources/${src}`
              : '/images/user-default.svg'
          }
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
