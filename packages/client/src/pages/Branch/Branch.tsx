import React from 'react'
import { Layout } from '../../components/Layout'
import { Post } from '../../components/UI/Post'

export const Branch = () => {
  return (
    <Layout>
      <div className="branch">
        <h2 className="branch__title">Game progress</h2>
        <div className="branch__wrapper">
          <div className="branch__links">
            <a href="#" className="link">
              New Message
            </a>
            <a href="#" className="link">
              Back
            </a>
          </div>
          <Post author='IloveFnd' avatar='https://n1s2.hsmedia.ru/6a/46/ae/6a46aeed947a183d67d1bc48211151bf/480x496_0xac120003_4430520541578509619.jpg' text='Did you like the game?'></Post>
          <Post author='IloveFnd' avatar='https://n1s2.hsmedia.ru/6a/46/ae/6a46aeed947a183d67d1bc48211151bf/480x496_0xac120003_4430520541578509619.jpg' text='Did you like the game?'></Post>
          <Post author='IloveFnd' avatar='https://n1s2.hsmedia.ru/6a/46/ae/6a46aeed947a183d67d1bc48211151bf/480x496_0xac120003_4430520541578509619.jpg' text='Did you like the game?'></Post>
        </div>
      </div>
    </Layout>
  )
}
