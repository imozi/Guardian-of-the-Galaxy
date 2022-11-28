import React, { FC, AllHTMLAttributes } from 'react'

type TopicProps = {
  topicName: string
  answers: string
} & AllHTMLAttributes<HTMLDivElement>

export const Topic: FC<TopicProps> = ({ ...props }) => {
  return (
    <div className="topic">
      <p>{props.topicName}</p>
      <p>{props.answers}</p>
    </div>
  )
}
