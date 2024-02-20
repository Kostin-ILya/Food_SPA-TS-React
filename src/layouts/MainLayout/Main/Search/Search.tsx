import { Input } from 'components/UI/Input'
import cl from './Search.module.scss'

export interface SearchProps {
  search: string
  setSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Search = ({ search, setSearch }: SearchProps) => {
  return (
    <div className={cl.search}>
      <img className={cl.icon} src="/icons/search_icon.svg" alt="search" />
      <Input
        name="search"
        placeholder="Введите блюдо или состав"
        value={search}
        onChange={setSearch}
      />
    </div>
  )
}
