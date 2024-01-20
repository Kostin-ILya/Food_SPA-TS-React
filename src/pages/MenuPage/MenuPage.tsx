import { useEffect, useState } from 'react'
import { useHTTP } from 'hooks/useHTTP'

import { Grid as Spinner } from 'react-loader-spinner'
import { Title } from 'components/Title'
import { Search } from 'layouts/MainLayout/Main/Search'
import { ProductCard } from './ProductCard'

import { IProduct } from 'shared/interfaces'
import cl from './MenuPage.module.scss'

// export interface MenuPageProps {}

export const MenuPage = (/* {}: MenuPageProps */) => {
  const [products, setProducts] = useState<IProduct[]>([])
  const { request, loadingStatus } = useHTTP()

  useEffect(() => {
    const fetchData = async () => {
      const data = (await request({
        url: '/products',
      })) as IProduct[]

      setProducts(data)
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <header className={cl.header}>
        <Title>Меню</Title>
        <Search />
      </header>

      <main className={cl.productList}>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </main>

      <Spinner
        visible={loadingStatus === 'loading'}
        color="var(--main-color)"
        height={150}
        width={150}
        wrapperClass={cl.spinner}
      />
    </>
  )
}
