import { useEffect, useState } from 'react'
import { useHTTP } from 'hooks/useHTTP'
import { AnimatePresence } from 'framer-motion'
import { Grid as Spinner } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'

import { Title } from 'components/Title'
import { Search } from 'layouts/MainLayout/Main/Search'
import { ProductCard } from './ProductCard'
import { Button } from 'components/UI/Button'

import { IProduct } from 'shared/interfaces'
import cl from './MenuPage.module.scss'

export const MenuPage = () => {
  const { request, loadingStatus } = useHTTP()

  const [products, setProducts] = useState<IProduct[]>([])
  const [page, setPage] = useState(1)
  const [initLoading, setInitLoading] = useState(true)
  const [isShowBtn, setIsShowBtn] = useState(true)

  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    request<IProduct[]>({
      url: '/products',
      params: { page, limit: 6 },
    })
      .then((data) => {
        setInitLoading(false)
        data.length < 6 && setIsShowBtn(false)

        setProducts((prevProducts) => [...prevProducts, ...data])
        setPage((prevPage) => prevPage + 1)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.ingredients.join(' ').toLowerCase().includes(search.toLowerCase())
  )

  if (initLoading && loadingStatus === 'loading') {
    return (
      <div className={cl.spinner}>
        <Spinner color="var(--main-color)" height={150} width={150} />
      </div>
    )
  } else if (loadingStatus === 'error') {
    return (
      <div className={cl.error}>
        <img src="/images/error.png" alt="error" />
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Delicious restaurant</title>
      </Helmet>

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
        </main>

        {isShowBtn && !search && (
          <div className={cl.showMore}>
            <Button onClick={fetchData} disabled={loadingStatus === 'loading'}>
              Показать еще
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

export default MenuPage
