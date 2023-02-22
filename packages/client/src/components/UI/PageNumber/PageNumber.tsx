import { FC, LiHTMLAttributes } from 'react'

type PageNumberProps = {
  quantity: number
  className: string
  onSelect: () => void
} & LiHTMLAttributes<HTMLLIElement>

export const PageNumber: FC<PageNumberProps> = ({
  quantity,
  className,
  onSelect,
}) => {
  return (
    <li onClick={onSelect} className={className}>
      {quantity}
    </li>
  )
}
