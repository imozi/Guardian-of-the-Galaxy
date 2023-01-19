import { FC } from 'react'

type HealthProps = {
  healths: number
}

export const Health: FC<HealthProps> = ({ healths }) => {
  const list = [...Array(healths).keys()]

  return (
    <ul className="healths">
      {list.map(el => (
        <li key={el} className="healths__item" />
      ))}
    </ul>
  )
}
