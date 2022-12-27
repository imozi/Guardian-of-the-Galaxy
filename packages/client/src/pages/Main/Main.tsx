import { Layout } from '../../components/Layout'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../store'

export const Main = () => {
  const user = useAppSelector(state => state.userState.user)

  return (
    <Layout>
      <div className="main">
        <div className="main__title">
          welcome aboard the <br /> Guardian of the Galaxy
        </div>
        <div className="main__buttons">
          <Link className="btn" to="/game">
            Start
          </Link>
          {!user && (
            <Link className="btn" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </Layout>
  )
}
