import { forwardRef } from 'react'

import clsx from 'clsx'

import cl from './Input.module.scss'

export interface InputProps {
  name: string
  placeholder?: string
  type?: 'password' | 'text' | 'email'
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, placeholder, type = 'text', onChange, value }, ref) => {
    return (
      <input
        className={clsx(cl.input, {
          [cl.search]: name === 'search',
        })}
        type={type}
        name={name}
        id={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        autoComplete={type === 'password' ? 'off' : 'on'}
        ref={ref}
        required
      />
    )
  }
)
