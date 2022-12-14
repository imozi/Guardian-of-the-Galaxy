import { Canvas } from '../../components/Canvas'
import { Layout } from '../../components/Layout'
import React from 'react'

export const Game = () => {
  return (
    <Layout isGame={true}>
      <Canvas id="game" />
    </Layout>
  )
}
