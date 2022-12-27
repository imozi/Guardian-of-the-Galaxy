import React, { useState } from 'react'
import { GameStart } from '../../components/GameStart'
import { Layout } from '../../components/Layout'
import { Link } from 'react-router-dom'
import { UserField } from '../../components/UI/UserField'
import { useAppSelector } from '../../store'

export const Game = () => {
  const user = useAppSelector(state => state.userState.user)

  const [isGameStart, setIsGameStart] = useState(false)

  const startGame = () => {
    setIsGameStart(true)
  }

  return (
    <Layout isGame={true}>
      {isGameStart ? (
        <GameStart />
      ) : (
        <>
          <div className="game__ship"></div>
          <div className="game__overlay"></div>
          {user && (
            <div className="game__nav">
              <UserField
                author={user.displayName || user.firstName}
                avatar={user.avatar}
              />
              <Link className="link" to="/leaderboard">
                Leaderboard
              </Link>
              <Link className="link" to="/profile">
                Profile
              </Link>
              <Link className="link" to="/forum">
                Forum
              </Link>
              <button className="link">Logout</button>
            </div>
          )}
          <div className="game__central">
            <button className="game__start" onClick={startGame}>
              Play
            </button>
          </div>
        </>
      )}
    </Layout>
  )
}
