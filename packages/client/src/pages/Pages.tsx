import { Route, Routes } from 'react-router-dom'
import { Front } from './Front'
import { Login } from './Login'
import { Register } from './Register'
import { Game } from './Game'
import { Leaderboard } from './Leaderboard'
import { Profile } from './Profile'
import { Password } from './Password'
import { Forum } from './Forum'
import { Branch } from './Branch'
import { NewMessage } from './NewMessage'
import { GameOver } from './GameOver'
import { ClientError } from './Error/404'
import { ServerError } from './Error/500'
import { PrivateRoute } from '@/hoc/ProtectedRoute'
import { User } from './User'
import { useEffect } from 'react'
import { NewTopic } from '@/pages/NewTopic'
import { useGetUserQuery } from '@/store/user/user.api'
import { useSigninWithOAuthYandexMutation } from '../store/auth/auth.api'
import { useAppSelector } from '@/store'
import { DEV_API_URL } from '../core/consts'

export function Pages() {
  const { isSuccess } = useGetUserQuery()
  const [signinWithOAuthYandex] = useSigninWithOAuthYandexMutation()
  const { isAuth } = useAppSelector(state => state.userState)

  useEffect(() => {
    const OAuthParams = new URLSearchParams(location.search)
    const code = OAuthParams.get('code')?.toString()

    const yandexOAuth = async (code: string) => {
      const redirectUri = DEV_API_URL
      return await signinWithOAuthYandex({
        code: code,
        redirect_uri: redirectUri,
      })
    }

    !isAuth && code && yandexOAuth(code)
  }, [])

  return (
    <Routes>
      <Route index element={<Front />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route
        path="user"
        element={
          <PrivateRoute isAuth={isSuccess}>
            <User />
          </PrivateRoute>
        }
      />
      <Route path="game" element={<Game />} />
      <Route path="game-over" element={<GameOver />} />
      <Route
        path="leaderboard"
        element={
          <PrivateRoute isAuth={isSuccess}>
            <Leaderboard />
          </PrivateRoute>
        }
      />
      <Route
        path="profile"
        element={
          <PrivateRoute isAuth={isSuccess}>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="password"
        element={
          <PrivateRoute isAuth={isSuccess}>
            <Password />
          </PrivateRoute>
        }
      />
      <Route
        path="forum"
        element={
          <PrivateRoute isAuth={isSuccess}>
            <Forum />
          </PrivateRoute>
        }
      />
      <Route
        path="/forum/:id"
        element={
          <PrivateRoute isAuth={isSuccess}>
            <Branch />
          </PrivateRoute>
        }
      />
      <Route
        path="/forum-add"
        element={
          <PrivateRoute isAuth={isSuccess}>
            <NewTopic />
          </PrivateRoute>
        }
      />
      <Route
        path="forum-message"
        element={
          <PrivateRoute isAuth={isSuccess}>
            <NewMessage />
          </PrivateRoute>
        }
      />
      <Route path="server-error" element={<ServerError />} />
      <Route path="*" element={<ClientError />} />
    </Routes>
  )
}
