import clsx from 'clsx'

import cl from './Input.module.scss'

export interface InputProps {
  name: string
  placeholder?: string
  type?: 'password' | 'text'
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({
  name,
  placeholder,
  type = 'text',
  value,
  onChange,
}: InputProps) => {
  return (
    <input
      className={clsx(cl.input, {
        [cl.search]: name === 'search',
      })}
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}
