import { Link } from 'react-router-dom'
import { Page } from '@/components/Page'

export const GameOver = () => {
  return (
    <Page title='GAME OVER' isGame={true}>
      <section className='game_over'>
      <div className="game__header">
        <div className="game__currentstat">
          <div className="game__level">LEVEL 1</div>
          <div>
            <span className="game__score">SCORE:</span>{' '}
            <span className="game__numbers">2334</span>
          </div>
        </div>
        <div className="game__highscore">
          <span className="game__score">HIGH SCORE</span>
          134876
        </div>
      </div>
      <div className="game__central">
        <div className="game__title">GAME OVER</div>
        <div className="game__buttons">
          <Link className="link" to="/game">
            Retry
          </Link>
          <Link className="link" to="/">
            Home
          </Link>
        </div>
      </div>
      </section>
    </Page>
  )
}
