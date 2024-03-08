import { useEffect, useState } from 'react'
import { useHTTP } from 'hooks/useHTTP'
import { AnimatePresence } from 'framer-motion'

import { Grid as Spinner } from 'react-loader-spinner'
import { Title } from 'components/Title'
import { Search } from 'layouts/MainLayout/Main/Search'
import { ProductCard } from './ProductCard'

import { IProduct } from 'shared/interfaces'
import cl from './MenuPage.module.scss'

export const MenuPage = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [search, setSearch] = useState<string>('')
  const { request, loadingStatus } = useHTTP()

  useEffect(() => {
    request<IProduct[]>({
      url: '/products',
    })
      .then((data) => {
        setProducts(data)
      })
      .catch((e) => {
        console.log(e)
      })

    // eslint-disable-next-line
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.ingredients.join(' ').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className={cl.menuPage}>
      <header className={cl.header}>
        <Title>Меню</Title>
        <Search search={search} setSearch={handleSearch} />
      </header>

      <main className={cl.productList}>
        <AnimatePresence initial={false}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </AnimatePresence>

        {search !== '' && filteredProducts.length === 0 && (
          <div className={cl.noProducts}>
            Ничего не найдено, измените запрос
          </div>
        )}

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
