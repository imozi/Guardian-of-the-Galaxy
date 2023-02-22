import { useAuthLogoutMutation } from '@/store/auth/auth.api'
import { Link, useNavigate } from 'react-router-dom'

export const UserNav = () => {
  const navigate = useNavigate()
  const [authLogout] = useAuthLogoutMutation()

  const onLogoutClick = () => {
    authLogout()
    navigate('/')
  }

  return (
    <section className="user__nav">
      <h3 className="visually-hidden">User navigation</h3>
      <ul className="user__nav-list">
        <li>
          <Link className="link" to="/leaderboard">
            Leaderboard
          </Link>
        </li>
        <li>
          <Link className="link" to="/profile">
            Profile
          </Link>
        </li>
        <li>
          <Link className="link" to="/forum">
            Forum
          </Link>
        </li>
        <li>
          <Link className="link" to="/feedback">
            Feedback
          </Link>
        </li>
        <li>
          <button className="link" onClick={onLogoutClick}>
            Logout
          </button>
        </li>
      </ul>
    </section>
  )
}
