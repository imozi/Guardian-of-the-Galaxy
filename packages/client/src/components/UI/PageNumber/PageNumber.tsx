import React, { FC, LiHTMLAttributes } from 'react'

type PageNumberProps = {
  quantity: string
} & LiHTMLAttributes<HTMLLIElement>

export const PaheNumber: FC<PageNumberProps> = ({ ...props }) => {
  return (
    <li className='branch__page'>{props.quantity}</li>
  )
}
