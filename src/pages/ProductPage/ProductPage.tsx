import { Await, defer, useLoaderData } from 'react-router-dom'
import axios from 'axios'
import { Grid as Spinner } from 'react-loader-spinner'
import { Suspense } from 'react'

import { Title } from 'components/Title'

import { IProduct } from 'shared/interfaces'
import cl from './ProductPage.module.scss'
import { Button } from 'components/UI/Button'
import { Rating } from 'components/Rating'

export const productLoader = ({ params }: { params: { id?: string } }) => {
  return defer({
    data: axios.get(`/products/${params.id}`).then((res) => res.data),
  })
}

export const ProductPage = () => {
  const { data } = useLoaderData() as { data: IProduct }

  return (
    <>
      <Suspense
        fallback={
          <Spinner
            color="var(--main-color)"
            height={150}
            width={150}
            wrapperClass={cl.spinner}
          />
        }
      >
        <Await resolve={data}>
          {(product: IProduct) => (
            <>
              <header className={cl.header}>
                <Title>{product.name}</Title>
                <Button appearance="exit">
                  <img src="/icons/cart_icon.svg" alt="cart" />В корзину
                </Button>
              </header>

              <main className={cl.product}>
                <img
                  className={cl.image}
                  src={product.image}
                  alt={product.name}
                />

                <div className={cl.info}>
                  <div className={cl.price}>
                    Цена
                    <span>
                      {product.price} <span> ₽</span>
                    </span>
                  </div>

                  <div className={cl.rating}>
                    Рейтинг
                    <Rating rating={product.rating} />
                  </div>

                  <div className={cl.ingredients}>
                    Состав:
                    <ul className={cl.ingredientsList}>
                      {product.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </main>
            </>
          )}
        </Await>
      </Suspense>
    </>
  )
}
