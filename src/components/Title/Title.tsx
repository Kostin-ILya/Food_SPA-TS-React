import cl from './Title.module.scss'

export interface TitleProps {
  children: string
}

export const Title = ({ children }: TitleProps) => {
  return <h1 className={cl.title}>{children}</h1>
}
