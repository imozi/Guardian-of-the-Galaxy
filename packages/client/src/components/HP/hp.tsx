import { FC } from 'react'

type HealthProps = {
  healths: number
}

export const Health: FC<HealthProps> = value => {
  const list = []

  for (let i = 0; i < value.healths; i++) {
    list.push(<li key={i} className="healths__item" />)
  }

  return <ul className="healths">{list}</ul>
}
