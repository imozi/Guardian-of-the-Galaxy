import React, { AllHTMLAttributes, FC } from 'react'

type PostProps = {
  author: string
  avatar: string
  text: string
} & AllHTMLAttributes<HTMLDivElement>

export const Post: FC<PostProps> = ({ ...props }) => {
  return (
    <div className="post">
      <div className="post__author">
        <img src={props.avatar} alt="avatar" className="post__photo" />
        <div className="post__author-name">{props.author}</div>
      </div>
      <p className="post__text">{props.text}</p>
    </div>
  )
}
