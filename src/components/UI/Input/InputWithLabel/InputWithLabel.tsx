import cl from './InputWithLabel.module.scss'

import { Input, InputProps } from 'components/UI/Input'

export interface InputWithLabelProps extends InputProps {
  children: string
}

export const InputWithLabel = ({
  children,
  name,
  placeholder,
  value,
  onChange,
}: InputWithLabelProps) => {
  return (
    <div className={cl.wrapper}>
      <label className={cl.label} htmlFor={name}>
        {children}
      </label>
      <Input
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
