import { Card } from '@/components/Card'
import { Page } from '@/components/Page'
import { PageNumber, Post } from '@/components/UI'
import { Loader } from '@/components/UI/Loader'
import { useGetMessagesQuery, useGetTopicQuery } from '@/store/forum/forum.api'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { API_RESOURCES_URL, USER_AVATAR_DEFAULT } from '@/core/consts'

export const Branch = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const limitPosts = 5

  const {
    data: topic,
    isLoading,
    isFetching,
  } = useGetTopicQuery(id, { refetchOnMountOrArgChange: true })
  const loading = isLoading || isFetching

  const {
    data: message,
    isLoading: isMessageLoading,
    isFetching: isMessageFetching,
  } = useGetMessagesQuery(id, { refetchOnMountOrArgChange: true })

  const pagesArray = []
  const pages: number = message
    ? Math.ceil(Number(message.rows.length) / limitPosts)
    : 1
  for (let i = 1; i < pages + 1; i++) {
    pagesArray.push(i)
  }

  const [currentPage, setCurrentPage] = useState(1)
  const [fisrtMessagePage, setFirstMessagePage] = useState(1)
  const [lastMessagePage, setLastMessagePage] = useState(limitPosts)

  return (
    <Page title={topic ? topic.name : ''}>
      <section className="profile forum">
        <h2 className="profile__title">{topic && topic.name}</h2>
        <div className="profile__wrapper">
          <div className="profile__nav">
            <Link
              className="link"
              to={'/forum-message'}
              state={{ topicId: id }}>
              New Message
            </Link>
            <a className="link" onClick={() => navigate(-1)}>
              Back
            </a>
          </div>
          <Card>
            <div className="branch__posts">
              {loading && (
                <div className="forum__loader">
                  <Loader />
                </div>
              )}
              {message?.rows
                .slice(fisrtMessagePage - 1, lastMessagePage)
                .map(({ id, user, text, answers, reactions, topicId }) => {
                  return (
                    <Post
                      postId={id}
                      topicId={topicId}
                      key={id}
                      author={user.name}
                      avatar={
                        user.avatar
                          ? `${API_RESOURCES_URL}/${user.avatar}`
                          : USER_AVATAR_DEFAULT
                      }
                      text={text}
                      answers={answers}
                      reactions={reactions}></Post>
                  )
                })}
            </div>
            <div className="branch__numbers">
              <a
                style={
                  currentPage === 1
                    ? { pointerEvents: 'none' }
                    : { visibility: 'visible' }
                }
                onClick={() => {
                  setFirstMessagePage(fisrtMessagePage - limitPosts)
                  setLastMessagePage(lastMessagePage - limitPosts)
                  setCurrentPage(currentPage - 1)
                }}
                href="#"
                className="link">
                Back
              </a>
              <ul className="branch__pages">
                {pagesArray?.map((value, index) => (
                  <PageNumber
                    key={index}
                    className={
                      value === currentPage
                        ? 'branch__page branch__page-active'
                        : 'branch__page'
                    }
                    quantity={Number(value)}
                    onSelect={() => {
                      setCurrentPage(value)
                      setLastMessagePage(value * limitPosts)
                      setFirstMessagePage(value * limitPosts - 4)
                    }}></PageNumber>
                ))}
              </ul>
              <a
                style={
                  currentPage >= pagesArray.length
                    ? { pointerEvents: 'none' }
                    : { visibility: 'visible' }
                }
                onClick={() => {
                  setFirstMessagePage(fisrtMessagePage + limitPosts)
                  setLastMessagePage(lastMessagePage + limitPosts)
                  setCurrentPage(currentPage + 1)
                }}
                href="#"
                className="link">
                Next
              </a>
            </div>
          </Card>
        </div>
      </section>
    </Page>
  )
}
