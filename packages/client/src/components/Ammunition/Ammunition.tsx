import { FC } from 'react'

type AmmunitionProps = {
  ammun: number
}

export const Ammunition: FC<AmmunitionProps> = ({ ammun }) => {
  const list = [...Array(ammun).keys()]

  return (
    <ul className="ammunition">
      {list.map(el => (
        <li key={el} className="ammunition__item" />
      ))}
    </ul>
  )
}
