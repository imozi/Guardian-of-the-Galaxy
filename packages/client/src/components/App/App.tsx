import { Route, Routes } from 'react-router-dom'
import { Branch } from '../../pages/Branch'
import { ClientError } from '../../pages/Error/404'
import { Forum } from '../../pages/Forum'
import { Game } from '../../pages/Game'
import { GameOver } from '../../pages/GameOver'
import { Leaderboard } from '../../pages/Leaderboard'
import { Login } from '../../pages/Login'
import { NewMessage } from '../../pages/NewMessage'
import { Password } from '../../pages/Password'
import { Profile } from '../../pages/Profile'
import { Register } from '../../pages/Register'
import { ServerError } from '../../pages/Error/500'
import { fullscreenAPI } from '../../webAPI/fullscreen'

fullscreenAPI()

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/password" element={<Password />} />
      <Route path="/register" element={<Register />} />
      <Route path="/game-over" element={<GameOver />} />
      <Route path="/forum" element={<Forum />} />
      <Route path="/forum-branch" element={<Branch />} />
      <Route path="/forum-newmessage" element={<NewMessage />} />
      <Route path="/game" element={<Game />} />
      <Route path="/server-error" element={<ServerError />} />
      <Route path='*' element={<ClientError />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
  )
}

export default App
