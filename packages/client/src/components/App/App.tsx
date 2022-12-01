import { Route, Routes } from 'react-router-dom'
import { Branch } from '../../pages/Branch'
import { Forum } from '../../pages/Forum'
import { Login } from '../../pages/Login'
import { NewMessage } from '../../pages/NewMessage'
import { Profile } from '../../pages/Profile'

function App() {
  // useEffect(() => {
  //   const fetchServerData = async () => {
  //     const url = `http://localhost:${__SERVER_PORT__}`
  //     const response = await fetch(url)
  //     const data = await response.json()
  //     console.log(data)
  //   }
  //
  //   fetchServerData()
  // }, [])

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/forum" element={<Forum />} />
      <Route path="/forum-branch" element={<Branch />} />
      <Route path="/forum-newmessage" element={<NewMessage />} />  
    </Routes>
  )
}

export default App
