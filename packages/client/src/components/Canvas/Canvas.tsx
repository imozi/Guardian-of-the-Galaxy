import React, { FC, useEffect } from 'react'

type CanvasProps = {
  id: string
}

export const Canvas: FC<CanvasProps> = ({ id }) => {
  useEffect(() => {
    const canvas = document.getElementById(id) as HTMLCanvasElement
    canvas.width = 1440
    canvas.height = window.innerHeight
  })

  return <canvas id={id}></canvas>
}
