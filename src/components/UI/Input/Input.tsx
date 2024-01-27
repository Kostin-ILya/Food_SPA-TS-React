import { forwardRef } from 'react'

import clsx from 'clsx'

import cl from './Input.module.scss'

export interface InputProps {
  name: string
  placeholder?: string
  type?: 'password' | 'text' | 'email'
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, placeholder, type = 'text' }, ref) => {
    return (
      <input
        className={clsx(cl.input, {
          [cl.search]: name === 'search',
        })}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        autoComplete={type === 'password' ? 'off' : 'on'}
        ref={ref}
        required
      />
    )
  }
)
