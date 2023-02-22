import { Link } from 'react-router-dom'
import { Page } from '@/components/Page'
import { useAppSelector } from '@/store'

export const Front = () => {
  const user = useAppSelector(state => state.userState.user)

  return (
    <Page title="Welcome">
      <section className="front">
        <div className="front__content">
          <h1 className="front__title">
            Welcome to the aboard the Guardian of the Galaxy
          </h1>
          <div className="front__buttons">
            <Link className="btn" to="/game">
              Start
            </Link>
            {user ? (
              <Link className="btn" to="/user">
                Home
              </Link>
            ) : (
              <Link className="btn" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </section>
    </Page>
  )
}
