import { Layout } from '../../components/Layout'
import { Link } from 'react-router-dom'

export const GameOver = () => {
  return (
    <Layout>
      <div className="gameover__wrapper">
        <div className="gameover__header">
          <div className="gameover__currentstat">
            <div className="gameover__level">LEVEL 1</div>
            <div>
              <span className="gameover__score">SCORE:</span>{' '}
              <span className="gameover__numbers">2334</span>
            </div>
          </div>
          <div className="gameover__highscore">
            <span className="gameover__score">HIGH SCORE</span>
            134876
          </div>
        </div>
        <div className="gameover__central">
          <div className="gameover__title">GAME OVER</div>
          <div className="gameover__buttons">
            <div className="gameover__buttons_wrapper">
              <Link className="link" to="/game">
                Retry
              </Link>
            </div>
            <div className="gameover__buttons_wrapper">
              <Link className="link" to="/">
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
