import { Layout } from '../../components/Layout'
import { Link } from 'react-router-dom'

export const GameOver = () => {
  return (
    <Layout isGame={true}>
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
    </Layout>
  )
}
