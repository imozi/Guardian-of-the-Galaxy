import { useNavigate } from 'react-router-dom'
import { Page } from '@/components/Page'
import { Topic } from '@/components/UI'

export const Forum = () => {
  const navigate = useNavigate()

  return (
    <Page title="Forum">
      <section className="forum">
        <h2 className="forum__title">Forum</h2>
        <div className="forum__wrapper">
          <div className="forum__links">
            <a href="#" className="link">
              New Topic
            </a>
            <a className="link" onClick={() => navigate(-1)}>
              Back
            </a>
          </div>
          <div className="forum__names">
            <h3 className="forum__name">Topic</h3>
            <h3 className="forum__name">Answers</h3>
          </div>
          <Topic topicName="game progress" answers="45"></Topic>
        </div>
      </section>
    </Page>
  )
}
