import { CanvasBoard } from '../CanvasBoard'
import { GameScore } from '../GameScore'
import { Health } from '../HP'
import React from 'react'

export const GameBoard = () => {
  return (
    <>
      <GameScore />
      <Health healths={3}></Health>
      <CanvasBoard />
    </>
  )
}
