import { Layout } from '../../components/Layout'
import { PageNumber } from '../../components/UI/PageNumber/PageNumber'
import { Post } from '../../components/UI/Post'
import React from 'react'

export const Lidearbord = () => {
  return (
    <Layout>
      <div className="lidearbord">
        <h2 className="lidearbord__title">Game progress</h2>
        <div className="lidearbord__wrapper">
          <div className="lidearbord__links">
            <a href="#" className="link">
              New Message
            </a>
            <a href="#" className="link">
              Back
            </a>
          </div>
          <div className="lidearbord__posts">
            <Post
              author="IloveFnd"
              avatar="https://n1s2.hsmedia.ru/6a/46/ae/6a46aeed947a183d67d1bc48211151bf/480x496_0xac120003_4430520541578509619.jpg"
              text="Did you like the game?"></Post>
            <Post
              author="IloveFnd"
              avatar="https://n1s2.hsmedia.ru/6a/46/ae/6a46aeed947a183d67d1bc48211151bf/480x496_0xac120003_4430520541578509619.jpg"
              text="Did you like the game?"></Post>
            <Post
              author="IloveFnd"
              avatar="https://n1s2.hsmedia.ru/6a/46/ae/6a46aeed947a183d67d1bc48211151bf/480x496_0xac120003_4430520541578509619.jpg"
              text="Did you like the game?"></Post>
          </div>
          <div className="lidearbord__numbers">
            <a href="#" className="link">
              Back
            </a>
            <ul className="lidearbord__pages">
              <PageNumber quantity="1"></PageNumber>
              <PageNumber quantity="2"></PageNumber>
              <PageNumber quantity="3"></PageNumber>
              <PageNumber quantity="4"></PageNumber>
            </ul>
            <a href="#" className="link">
              Next
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}
