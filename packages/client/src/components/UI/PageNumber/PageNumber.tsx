import React, { FC, LiHTMLAttributes } from 'react'

type PageNumberProps = {
  quantity: string
} & LiHTMLAttributes<HTMLLIElement>

export const PageNumber: FC<PageNumberProps> = ({quantity}) => {
  return (
    <li className='branch__page'>{quantity}</li>
  )
}
