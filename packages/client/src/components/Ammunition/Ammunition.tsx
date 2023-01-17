import { FC } from 'react'

type AmmunitionProps = {
  ammun: number
}

export const Ammunition: FC<AmmunitionProps> = value => {
  const list = []

  for (let i = 0; i < value.ammun; i++) {
    list.push(<li key={i} className="ammunition__item" />)
  }

  return <ul className="ammunition">{list}</ul>
}
