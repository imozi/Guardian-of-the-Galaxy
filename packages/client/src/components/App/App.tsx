import { Route, Routes } from 'react-router-dom'
import { Branch } from '../../pages/Branch'
import { Forum } from '../../pages/Forum'
import { Game } from '../../pages/Game'
import { Lidearbord } from '../../pages/Lidearbord'
import { Login } from '../../pages/Login'
import { NewMessage } from '../../pages/NewMessage'
import { Profile } from '../../pages/Profile'
import { Register } from '../../pages/Register'

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
      <Route path="/lidearbord" element={<Lidearbord />} />
    </Routes>
  )
}

export default App
