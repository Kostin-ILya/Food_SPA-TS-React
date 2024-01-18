import { Title } from 'components/Title'
import { Search } from 'layouts/MainLayout/Main/Search'

import cl from './MenuPage.module.scss'
import { ProductCard } from './ProductCard'

export interface MenuPageProps {}

export const MenuPage = (/* {}: MenuPageProps */) => {
  return (
    <>
      <header className={cl.header}>
        <Title>Меню</Title>
        <Search />
      </header>

      <main className={cl.productList}>
        <ProductCard
          name="Жаркое с сыром"
          description="Картофель, сыр, перец, фарш"
          price={320}
          rating={4.5}
          image="/images/food/roast.png"
          id={1}
        />
      </main>
    </>
  )
}
