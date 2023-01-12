import { Route, Routes } from 'react-router-dom'
import { PrivateRoute } from '@/hoc/ProtectedRoute'
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
import { useGetUserQuery } from '@/store/user/user.api'

export function Pages() {
  const { isSuccess, isLoading, isFetching } = useGetUserQuery()
  const loading = isLoading || isFetching

  //TODO придумать лоадер
  if (loading) {
    return (
      <>
        <p>loading</p>
      </>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Front />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/game" element={<Game />} />
      <Route path="/game-over" element={<GameOver />} />
      <Route
        path="/leaderboard"
        element={
          <PrivateRoute isAuth={isSuccess}>
            <Leaderboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute isAuth={isSuccess}>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/password"
        element={
          <PrivateRoute isAuth={isSuccess}>
            <Password />
          </PrivateRoute>
        }
      />
      <Route
        path="/forum"
        element={
          <PrivateRoute isAuth={isSuccess}>
            <Forum />
          </PrivateRoute>
        }
      />
      <Route
        path="/forum-branch"
        element={
          <PrivateRoute isAuth={isSuccess}>
            <Branch />
          </PrivateRoute>
        }
      />
      <Route
        path="/forum-message"
        element={
          <PrivateRoute isAuth={isSuccess}>
            <NewMessage />
          </PrivateRoute>
        }
      />
      <Route path="/server-error" element={<ServerError />} />
      <Route path="*" element={<ClientError />} />
    </Routes>
  )
}
