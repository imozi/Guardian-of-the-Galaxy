import { Route, Routes } from 'react-router-dom'
import { Branch } from '../../pages/Branch'
import { ClientError } from '../../pages/Error/404'
import { Forum } from '../../pages/Forum'
import { Game } from '../../pages/Game'
import { GameOver } from '../../pages/GameOver'
import { Layout } from '../Layout'
import { Leaderboard } from '../../pages/Leaderboard'
import { Login } from '../../pages/Login'
import { Main } from '../../pages/Main'
import { NewMessage } from '../../pages/NewMessage'
import { Password } from '../../pages/Password'
import { PrivateRoute } from '../../hoc/ProtectedRoute'
import { Profile } from '../../pages/Profile'
import { Register } from '../../pages/Register'
import { ServerError } from '../../pages/Error/500'
import { fullscreenAPI } from '../../webAPI/fullscreen'
import { useGetUserQuery } from '../../store/user/user.api'

fullscreenAPI()

function App() {
  const { isSuccess, isLoading, isFetching } = useGetUserQuery()
  const loading = isLoading || isFetching

  //TODO придумать лоадер
  if (loading) {
    return (
      <Layout>
        <></>
      </Layout>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/game-over" element={<GameOver />} />
      <Route path="/game" element={<Game />} />
      <Route path="/server-error" element={<ServerError />} />
      <Route path="*" element={<ClientError />} />
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
        path="/forum-newmessage"
        element={
          <PrivateRoute isAuth={isSuccess}>
            <NewMessage />
          </PrivateRoute>
        }
      />
      <Route
        path="/leaderboard"
        element={
          <PrivateRoute isAuth={isSuccess}>
            <Leaderboard />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}

export default App
