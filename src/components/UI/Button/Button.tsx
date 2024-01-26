import clsx from 'clsx'

import cl from './Button.module.scss'
import { forwardRef } from 'react'

export interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  appearance?: 'big' | 'exit'
  disabled?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, appearance, onClick, disabled = false }, ref) => {
    const { button, big, exit } = cl

    return (
      <button
        className={clsx(button, {
          [big]: appearance === 'big',
          [exit]: appearance === 'exit',
        })}
        onClick={onClick}
        disabled={disabled}
        ref={ref}
      >
        {children}
      </button>
    )
  }
)
