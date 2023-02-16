import { Link } from 'react-router-dom'
import { Page } from '@/components/Page'
import { Topic } from '@/components/UI'
import { useGetTopicsQuery } from '@/store/forum/forum.api'
import { Loader } from '@/components/UI/Loader'
import { Card } from '@/components/Card'

export const Forum = () => {
  const {
    data: topics,
    isLoading,
    isFetching,
  } = useGetTopicsQuery(undefined, { refetchOnMountOrArgChange: true })
  const loading = isLoading || isFetching

  return (
    <Page title="Forum">
      <section className="profile forum">
        <h2 className="profile__title">Forum</h2>
        <Link className="link" to="/feedback">
          Feedback
        </Link>
        <div className="profile__wrapper">
          <div className="profile__nav">
            <Link className="link" to="/forum-add">
              New Topic
            </Link>
            <Link className="link" to="/user">
              Back
            </Link>
          </div>
          <Card>
            <div className="forum__names">
              <h3 className="forum__name">Topic</h3>
              <h3 className="forum__name">Messages</h3>
            </div>
            {loading && (
              <div className="forum__loader">
                <Loader />
              </div>
            )}
            {topics &&
              topics.map(({ id, name, messagesCount }) => (
                <Link key={id} className="forum__topic" to={`/forum/${id}`}>
                  <Topic
                    topicName={name}
                    answers={messagesCount || '0'}></Topic>
                </Link>
              ))}
          </Card>
        </div>
      </section>
    </Page>
  )
}
