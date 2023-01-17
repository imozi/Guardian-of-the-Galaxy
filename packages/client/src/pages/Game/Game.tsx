import { useNavigate } from 'react-router-dom'
import { CurrentScore } from '@/components/CurrentScore'
import { HightScore } from '@/components/HightScore'
import { CurrentLevel } from '@/components/CurrentLevel'
import { Page } from '@/components/Page'
import { GuardianOfTheGalaxy } from '@/game'
import { useEffect, useRef, useState } from 'react'
import { Health } from '@/components/HP'
import { GameStartTimer } from '@/components/GameStartTimer'
import { Ammunition } from '@/components/Ammunition'

export const Game = () => {
  const [isStartGame, setIsGameStart] = useState(false)
  const gameContainer = useRef<HTMLDivElement | null>(null)
  const game = useRef<GuardianOfTheGalaxy | null>(null)

  const navigation = useNavigate()

  useEffect(() => {
    if (gameContainer.current) {
      game.current = new GuardianOfTheGalaxy(gameContainer.current)
      game.current.on(GuardianOfTheGalaxy.EVENTS.UPDATE_SCORE, log)
      game.current.on(GuardianOfTheGalaxy.EVENTS.UPDATE_LIVE, log)
      game.current.on(GuardianOfTheGalaxy.EVENTS.UPDATE_LEVEL, log)
    }

    return () => {
      game.current?.destroy()
      game.current = null
    }
  }, [game])

  const log = (a: number) => {
    console.log(a)
  }

  const startGame = () => {
    setIsGameStart(true)
    game.current?.start()
  }

  const onClickPause = () => {
    game.current?.stop()
  }

  const onClickResume = () => {
    game.current?.resume()
  }

  return (
    <Page title="Game" isGame={true}>
      <GameStartTimer callback={startGame} />
      <section className="game" data-start={isStartGame}>
        <div className="game__current-stat">
          <CurrentLevel level={1} />
          <CurrentScore score={0} />
        </div>
        <ul className="game__menu">
          <li className="game__menu__item">
            <button className="link" onClick={onClickPause}>
              Pause
            </button>
          </li>
          <li className="game__menu__item">
            <button className="link" onClick={onClickResume}>
              Resume
            </button>
          </li>
          <li className="game__menu__item">
            <a className="link" onClick={() => navigation(-1)}>
              Quit
            </a>
          </li>
        </ul>
        <div className="game__container" ref={gameContainer}></div>
        <HightScore score={0} />
        <Health healths={3} />
        <Ammunition ammun={2} />
      </section>
    </Page>
  )
}
