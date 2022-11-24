import React, { FC, ButtonHTMLAttributes } from 'react';
import './Button.scss';

type ButtonProps = {
  loading?: boolean;
  onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ children, loading, ...props }) => {
  let className = 'btn';
  if (loading) {
    className += ' btn--loading';
  }

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};