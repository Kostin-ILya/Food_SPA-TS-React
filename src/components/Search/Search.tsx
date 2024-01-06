import { Input } from 'components/UI/Input'
import cl from './Search.module.scss'

export interface SearchProps {}

export const Search = (/* {}: SearchProps */) => {
  return (
    <div className={cl.search}>
      <img className={cl.icon} src="/search_icon.svg" alt="search" />
      <Input name="search" placeholder="Введите блюдо или состав" />
    </div>
  )
}
