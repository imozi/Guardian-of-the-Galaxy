import { Route, Routes } from 'react-router-dom'
import { Branch } from '../../pages/Branch'
import { Forum } from '../../pages/Forum'
import { Game } from '../../pages/Game'
import { Login } from '../../pages/Login'
import { NewMessage } from '../../pages/NewMessage'
import { Password } from '../../pages/Password'
import { Profile } from '../../pages/Profile'
import { Register } from '../../pages/Register'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/password" element={<Password />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forum" element={<Forum />} />
      <Route path="/forum-branch" element={<Branch />} />
      <Route path="/forum-newmessage" element={<NewMessage />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  )
}

export default App
