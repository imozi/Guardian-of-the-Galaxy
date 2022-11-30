import { Routes, Route } from 'react-router-dom'
import { Login } from '../../pages/Login'
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
    </Routes>
  )
}

export default App
