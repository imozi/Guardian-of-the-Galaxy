import { Link, useNavigate } from 'react-router-dom'
import { Page } from '@/components/Page'
import { PageNumber, Post } from '@/components/UI'

export const Branch = () => {
  const navigate = useNavigate()

  return (
    <Page title="Game progress">
      <section className="branch">
        <h2 className="branch__title">Game progress</h2>
        <div className="branch__wrapper">
          <div className="branch__links">
            <Link className="link" to={'/forum-message'}>
              New Message
            </Link>
            <a className="link" onClick={() => navigate(-1)}>
              Back
            </a>
          </div>
          <div className="branch__posts">
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
          <div className="branch__numbers">
            <a href="#" className="link">
              Back
            </a>
            <ul className="branch__pages">
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
      </section>
    </Page>
  )
}
