import { ButtonHTMLAttributes, FC } from 'react'

type ButtonProps = {
  loading?: boolean
  green?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FC<ButtonProps> = ({
  children,
  loading,
  green,
  ...props
}) => {
  let className = 'btn'
  if (loading) {
    className += ' btn--loading'
  }
  if (green) {
    className += ' btn--green'
  }

  return (
    <button className={className} {...props}>
      {children}
    </button>
  )
}
