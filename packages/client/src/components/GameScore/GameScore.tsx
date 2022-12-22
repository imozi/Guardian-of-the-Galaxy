export const GameScore = () => {
  return (
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
  )
}
