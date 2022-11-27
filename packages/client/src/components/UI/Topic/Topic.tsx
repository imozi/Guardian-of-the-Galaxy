import React, { FC, ButtonHTMLAttributes } from 'react'

type TopicProps = {
  topicName: string
  answers: string
} & ButtonHTMLAttributes<HTMLDivElement>

export const Topic: FC<TopicProps> = ({ ...props }) => {
  return (
    <div className="topic">
      <p>{props.topicName}</p>
      <p>{props.answers}</p>
    </div>
  )
}
