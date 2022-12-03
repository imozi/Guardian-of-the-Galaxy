import { Route, Routes } from 'react-router-dom'
import { Branch } from '../../pages/Branch'
import { ClientError } from '../../pages/Error/404'
import { Forum } from '../../pages/Forum'
import { Game } from '../../pages/Game'
import { Login } from '../../pages/Login'
import { NewMessage } from '../../pages/NewMessage'
import { Profile } from '../../pages/Profile'
import { Register } from '../../pages/Register'
import { ServerError } from '../../pages/Error/500'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forum" element={<Forum />} />
      <Route path="/forum-branch" element={<Branch />} />
      <Route path="/forum-newmessage" element={<NewMessage />} />
      <Route path="/game" element={<Game />} />
      <Route path="/server-error" element={<ServerError />} />
      <Route path='*' element={<ClientError />} />
    </Routes>
  )
}

export default App
