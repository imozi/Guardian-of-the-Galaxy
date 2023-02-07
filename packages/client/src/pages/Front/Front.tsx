import { Link } from 'react-router-dom'
import { Page } from '@/components/Page'
import { useAppSelector } from '@/store'
import { Audioplayer } from '@/components/AudioPlayer/AudioPlayer'
import { isBrowser } from '@/core/utils/isBrowser'

export const Front = () => {
  const user = useAppSelector(state => state.userState.user)

  return (
    <Page title="Welcome">
      <section className="front">
        <div className="front__content">
          <h1 className="front__title">
            Welcome aboard the Guardian of the Galaxy
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
      <Audioplayer url="sounds/a31df44c3944ea6.mp3" />
    </Page>
  )
}
