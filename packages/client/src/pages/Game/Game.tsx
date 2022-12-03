import React, { useState } from 'react'
import { Layout } from '../../components/Layout'
import { Timer } from '../../components/Timer'

export const Game = () => {
  const [count, setCount] = useState(5)

  return (
    <Layout>
      <Timer value={count}/>
    </Layout>
  )
}
