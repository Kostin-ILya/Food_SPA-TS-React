import { Title } from 'components/Title'
import { Search } from 'layouts/MainLayout/Main/Search'

import cl from './MenuPage.module.scss'

export interface MenuPageProps {}

export const MenuPage = (/* {}: MenuPageProps */) => {
  return (
    <>
      <header className={cl.header}>
        <Title>Меню</Title>
        <Search />
      </header>
    </>
  )
}
