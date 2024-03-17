import clsx from 'clsx'
import cl from './Title.module.scss'

export interface TitleProps {
  children: string
  className?: string
}

export const Title = ({ children, className }: TitleProps) => {
  return <h1 className={clsx(cl.title, className)}>{children}</h1>
}
