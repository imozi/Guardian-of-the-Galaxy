import { Link, useNavigate, useParams } from 'react-router-dom'
import { Page } from '@/components/Page'
import { PageNumber, Post } from '@/components/UI'
import { useGetTopicQuery } from '@/store/forum/forum.api'
import { Card } from '@/components/Card'

export const Branch = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const {
    data: topic,
    isLoading,
    isFetching,
  } = useGetTopicQuery(id, { refetchOnMountOrArgChange: true })
  const loading = isLoading || isFetching

  return (
    <Page title="Game progress">
      <section className="profile forum branch">
        <h2 className="profile__title">{topic && topic.name}</h2>
        <div className="profile__wrapper">
          <div className="profile__nav">
            <Link className="link" to={'/forum-message'}>
              New Message
            </Link>
            <a className="link" onClick={() => navigate(-1)}>
              Back
            </a>
          </div>
          <Card>
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
          </Card>
        </div>
      </section>
    </Page>
  )
}
