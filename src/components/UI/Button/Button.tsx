import clsx from 'clsx'

import cl from './Button.module.scss'

export interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  appearance?: 'big' | 'exit'
  disabled?: boolean
}

export const Button = ({
  children,
  appearance,
  onClick,
  disabled = false,
}: ButtonProps) => {
  const { button, big, exit } = cl

  return (
    <button
      className={clsx(button, {
        [big]: appearance === 'big',
        [exit]: appearance === 'exit',
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
