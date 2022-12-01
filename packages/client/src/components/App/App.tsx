import { Route, Routes } from 'react-router-dom'
import { Branch } from '../../pages/Branch'
import { Forum } from '../../pages/Forum'
import { Login } from '../../pages/Login'
import { NewMessage } from '../../pages/NewMessage'
import { Register } from '../../pages/Register'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forum" element={<Forum />} />
      <Route path="/forum-branch" element={<Branch />} />
      <Route path="/forum-newmessage" element={<NewMessage />} />
    </Routes>
  )
}

export default App
