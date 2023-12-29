import cl from './Input.module.scss'

export interface InputProps {
  children: string
  name: string
  placeholder?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({
  children,
  name,
  placeholder,
  value,
  onChange,
}: InputProps) => {
  return (
    <div className={cl.wrapper}>
      <label className={cl.label} htmlFor={name}>
        {children}
      </label>
      <input
        className={cl.input}
        type="text"
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
