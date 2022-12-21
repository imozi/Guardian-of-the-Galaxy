import React, { useEffect, useRef } from 'react'
import { Health } from '../../components/HP'
import { Layout } from '../../components/Layout'
import MainShip from '../../model/MainShip'
import Weapon from '../../model/Weapon'

export const Game = () => {
  const boardIndent = 32
  const boardHeight = window.innerHeight - boardIndent
  const boardWidth = window.innerWidth - boardIndent
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mainShip = new MainShip(boardWidth, boardHeight)
  const weapons: Weapon[] = []

  const onKeydown = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
      weapons.push(new Weapon(mainShip.getX(), mainShip.getY()))
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeydown)
    animate()

    return () => {
      document.removeEventListener('keydown', onKeydown)
    }
  }, [])

  const animate = () => {
    if (!canvasRef.current) {
      return
    }

    canvasRef.current.width = boardWidth
    canvasRef.current.height = boardHeight

    const context = canvasRef.current && canvasRef.current.getContext('2d')
    if (context) {
      context.clearRect(0, 0, boardWidth, boardHeight)
      context.save()

      mainShip.draw(context)
      context.restore()
      context.save()

      weapons.forEach((weapon, index) => {
        if (weapon.getY() <= 0) {
          setTimeout(() => {
            weapons.splice(index, 1)
          }, 0)
        } else {
          weapon.update(context)
        }
      })
      context.restore()
      context.save()
    }

    requestAnimationFrame(animate)
  }

  return (
    <Layout isGame={true}>
      <Health healths={3}></Health>
      <canvas ref={canvasRef} />
    </Layout>
  )
}
