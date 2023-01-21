import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CurrentScore } from '@/components/CurrentScore'
import { HightScore } from '@/components/HightScore'
import { CurrentLevel } from '@/components/CurrentLevel'
import { Page } from '@/components/Page'
import { GuardianOfTheGalaxy } from '@/game'
import { Health } from '@/components/HP'
import { GameStartTimer } from '@/components/GameStartTimer'
import { Ammunition } from '@/components/Ammunition'

export const Game = () => {
  const navigation = useNavigate()

  const gameContainer = useRef<HTMLDivElement | null>(null)
  const game = useRef<GuardianOfTheGalaxy | null>(null)

  const [isStartGame, setIsGameStart] = useState(false)
  const [currentScore, setCurrentScore] = useState(0)
  const [currentLevel, setCurrentLevel] = useState(0)
  const [currentLife, setCurrentLife] = useState(0)
  const [currentAmmun, setCurrentAmmun] = useState(0)
  const [currentHightScore, setHightScore] = useState(0)

  useEffect(() => {
    if (gameContainer.current) {
      game.current = new GuardianOfTheGalaxy(gameContainer.current)

      updateScore(game.current.score)
      updateHightScore(game.current.hightScore)
      updateLevel(game.current.level)
      updateLife(game.current.life)
      updateAmmun(game.current.mainShipAmmun)

      game.current.on(GuardianOfTheGalaxy.EVENTS.UPDATE_LEVEL, updateLevel)
      game.current.on(GuardianOfTheGalaxy.EVENTS.UPDATE_SCORE, updateScore)
      game.current.on(GuardianOfTheGalaxy.EVENTS.UPDATE_LIVE, updateLife)
      game.current.on(GuardianOfTheGalaxy.EVENTS.UPDATE_AMMUN, updateAmmun)
      game.current.on(GuardianOfTheGalaxy.EVENTS.GAME_END, endGame)
    }

    return () => {
      game.current?.destroy()
      game.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game])

  const updateScore = (score: number) => {
    setCurrentScore(score)
  }

  const updateHightScore = (score: number) => {
    setHightScore(score)
  }

  const updateLevel = (level: number) => {
    setCurrentLevel(level)
  }

  const updateLife = (life: number) => {
    setCurrentLife(life)
  }

  const updateAmmun = (ammun: number) => {
    setCurrentAmmun(ammun)
  }

  const startGame = () => {
    setIsGameStart(true)
    game.current?.start()
  }

  const endGame = (level: number, score: number, hightScore: number) => {
    navigation('/game-over', {
      state: {
        level,
        score,
        hightScore,
      },
    })
  }

  const onBlurElement = (elem: HTMLButtonElement) => {
    elem.blur()
  }

  const onClickPause = (
    evt: React.MouseEvent<HTMLButtonElement> & {
      target: HTMLButtonElement
    }
  ) => {
    game.current?.stop()
    onBlurElement(evt.target)
  }

  const onClickResume = (
    evt: React.MouseEvent<HTMLButtonElement> & {
      target: HTMLButtonElement
    }
  ) => {
    game.current?.resume()
    onBlurElement(evt.target)
  }

  return (
    <Page title="Game" isGame={true}>
      <GameStartTimer callback={startGame} />
      <section className="game" data-start={isStartGame}>
        <div className="game__current-stat">
          <CurrentLevel level={currentLevel} />
          <CurrentScore score={currentScore} />
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
            <Link className="link" to={'/'}>
              Quit
            </Link>
          </li>
        </ul>
        <div className="game__container" ref={gameContainer}></div>
        <HightScore score={currentHightScore} />
        <Health healths={currentLife} />
        <Ammunition ammun={currentAmmun} />
      </section>
    </Page>
  )
}
