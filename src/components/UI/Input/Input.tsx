import clsx from 'clsx'

import cl from './Input.module.scss'

export interface InputProps {
  name: string
  placeholder?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({ name, placeholder, value, onChange }: InputProps) => {
  return (
    <input
      className={clsx(cl.input, {
        [cl.search]: name === 'search',
      })}
      type="text"
      name={name}
      id={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}
