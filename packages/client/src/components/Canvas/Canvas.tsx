import React, { FC } from 'react'

type CanvasProps = {
  id: string
}

export const Canvas: FC<CanvasProps> = ({ id }) => {
  return <canvas id={id}></canvas>
}
