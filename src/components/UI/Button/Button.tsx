import { motion } from 'framer-motion'
import clsx from 'clsx'

import cl from './Button.module.scss'
import { forwardRef } from 'react'

export interface ButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  appearance?: 'big' | 'withIcon'
  disabled?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, appearance, className, onClick, disabled = false }, ref) => {
    const { button, big, withIcon } = cl

    return (
      <motion.button
        className={clsx(button, className, {
          [big]: appearance === 'big',
          [withIcon]: appearance === 'withIcon',
        })}
        onClick={onClick}
        disabled={disabled}
        ref={ref}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
      >
        {children}
      </motion.button>
    )
  }
)
