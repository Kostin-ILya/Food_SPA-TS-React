import { forwardRef } from 'react'

import { Input, InputProps } from 'components/UI/Input'

import cl from './InputWithLabel.module.scss'

export interface InputWithLabelProps extends InputProps {
  children: string
}

export const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ children, name, ...rest }, ref) => {
    return (
      <div className={cl.wrapper}>
        <label className={cl.label} htmlFor={name}>
          {children}
        </label>
        <Input name={name} ref={ref} {...rest} />
      </div>
    )
  }
)
