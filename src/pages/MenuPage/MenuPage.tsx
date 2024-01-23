import { useEffect, useState } from 'react'
import { useHTTP } from 'hooks/useHTTP'

import { Grid as Spinner } from 'react-loader-spinner'
import { Title } from 'components/Title'
import { Search } from 'layouts/MainLayout/Main/Search'
import { ProductCard } from './ProductCard'

import { IProduct } from 'shared/interfaces'
import cl from './MenuPage.module.scss'

export const MenuPage = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const { request, loadingStatus } = useHTTP()

  useEffect(() => {
    request({
      url: '/products',
    }).then((data) => {
      setProducts(data)
    })

    // eslint-disable-next-line
  }, [])

  return (
    <div className={cl.menuPage}>
      <header className={cl.header}>
        <Title>Меню</Title>
        <Search />
      </header>

      <main className={cl.productList}>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
        <Spinner
          visible={loadingStatus === 'loading'}
          color="var(--main-color)"
          height={150}
          width={150}
          wrapperClass={cl.spinner}
        />
      </main>
    </div>
  )
}
