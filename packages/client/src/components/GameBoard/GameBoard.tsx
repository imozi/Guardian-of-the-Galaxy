import { GameScore } from "../GameScore"
import { Health } from "../HP"

export const GameBoard = () => {
  return (
    <>
      <GameScore />
      <Health healths={3}></Health>
    </>
  )
}
