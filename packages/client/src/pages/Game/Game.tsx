import React, { useEffect, useRef, useState } from 'react'
import { Layout } from '../../components/Layout'
import MainShip from '../../model/MainShip'

export const Game = () => {
  const boardIndent = 32
  const boardHeight = window.innerHeight - boardIndent
  const boardWidth = window.innerWidth - boardIndent
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mainShip = new MainShip(boardWidth, boardHeight)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)

  useEffect(() => {
    setContext(canvasRef.current && canvasRef.current.getContext('2d'))
    animate()
  }, [context])

  const animate = () => {
    if (!canvasRef.current) {
      return
    }

    canvasRef.current.width = boardWidth
    canvasRef.current.height = boardHeight

    if (context) {
      context.clearRect(0, 0, boardWidth, boardHeight)
      mainShip.draw(context)
      context.restore()
      context.save()
    }

    requestAnimationFrame(animate)
  }

  return (
    <Layout isGame={true}>
      <canvas ref={canvasRef} />
    </Layout>
  )
}
