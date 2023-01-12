import { useNavigate } from 'react-router-dom'
import { Page } from '@/components/Page'
import { UserField } from '@/components/UI'

export const Leaderboard = () => {
  const navigate = useNavigate()

  return (
    <Page title="Leaderboard">
      <section className="leaderboard">
        <h2 className="leaderboard__title">Leaderboard</h2>
        <div className="leaderboard__wrapper">
          <div className="leaderboard__links">
            <a className="link" onClick={() => navigate(-1)}>
              Back
            </a>
          </div>
          <div className="leaderboard__user-field">
            <div className="leaderboard__names">
              <h3 className="leaderboard__name">USERS</h3>
              <h3 className="leaderboard__name">SCORS</h3>
            </div>
            <UserField number={1} author="IloveFnd" score={553}></UserField>
          </div>
        </div>
      </section>
    </Page>
  )
}
