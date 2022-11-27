import React from 'react'
import { Layout } from '../../components/Layout'
import { Topic } from '../../components/UI/Topic'

export const Forum = () => {
  return (
    <Layout>
      <div className="forum">
        <h2 className="forum__title">Forum</h2>
        <div className="forum__wrapper">
          <div className="forum__links">
            <a href="#" className="link">
              New Topic
            </a>
            <a href="#" className="link">
              Back
            </a>
          </div>
          <div className="forum__names">
            <h3 className="forum__name">Topic</h3>
            <h3 className="forum__name">Answers</h3>
          </div>
          <Topic topicName="game progress" answers="45"></Topic>
        </div>
      </div>
    </Layout>
  )
}
