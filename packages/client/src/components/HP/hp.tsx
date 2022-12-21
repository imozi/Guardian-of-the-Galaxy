import React, { FC } from 'react'

type HealthProps = {
  healths: 0 | 1 | 2 | 3
}

export const Health: FC<HealthProps> = value => {
  const res = []

  for (let i = 0; i < value.healths; i++) {
    console.log(i)
    res.push(<li key={i} className="health"></li>)
  }

  return <ul className="healths">{res}</ul>
}
