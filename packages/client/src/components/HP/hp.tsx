import React, { FC } from 'react'

type HealthProps = {
  healths: 0 | 1 | 2 | 3
}

export const Health: FC<HealthProps> = value => {
  const list = []

  for (let i = 0; i < value.healths; i++) {
    list.push(<li key={i} className="health" />)
  }

  return <ul className="healths">{list}</ul>
}
