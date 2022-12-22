import React, { useState } from 'react'
import { GameStart } from '../../components/GameStart'
import { Layout } from '../../components/Layout'
import { Link } from 'react-router-dom'
import { UserField } from '../../components/UI/UserField'

export const Game = () => {
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
          <div className="game__nav">
            <UserField
              author="IloveFronted"
              avatar="https://n1s2.hsmedia.ru/6a/46/ae/6a46aeed947a183d67d1bc48211151bf/480x496_0xac120003_4430520541578509619.jpg"
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
