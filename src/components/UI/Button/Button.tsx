import clsx from 'clsx'

import cl from './Button.module.scss'

export interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  appearance?: 'big'
  disabled?: boolean
}

export const Button = ({
  children,
  appearance,
  onClick,
  disabled = false,
}: ButtonProps) => {
  const { button, big } = cl

  return (
    <button
      className={clsx(button, appearance === 'big' && big)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
