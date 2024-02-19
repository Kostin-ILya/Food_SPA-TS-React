import { Await, defer, useLoaderData } from 'react-router-dom'
import axios from 'axios'
import { Grid as Spinner } from 'react-loader-spinner'
import { Suspense } from 'react'

import { Title } from 'components/Title'

import { IProduct } from 'shared/interfaces'
import cl from './ProductPage.module.scss'
import { Button } from 'components/UI/Button'
import { Rating } from 'components/Rating'
import { useAppDispatch } from 'hooks/redux'
import { addToCart } from 'store/cart/cartSlice'

export const productLoader = ({ params }: { params: { id?: string } }) => {
  return defer({
    data: axios.get<IProduct>(`/products/${params.id}`).then((res) => res.data),
  })
}

export const ProductPage = () => {
  const { data } = useLoaderData() as { data: IProduct }
  const dispatch = useAppDispatch()

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
          {({ id, name, ingredients, price, image, rating }: IProduct) => (
            <>
              <header className={cl.header}>
                <Title>{name}</Title>
                <Button
                  appearance="exit"
                  onClick={() =>
                    dispatch(
                      addToCart({
                        id,
                        name,
                        price,
                        image,
                      })
                    )
                  }
                >
                  <img src="/icons/cart_icon.svg" alt="cart" />В корзину
                </Button>
              </header>

              <main className={cl.product}>
                <img className={cl.image} src={image} alt={name} />

                <div className={cl.info}>
                  <div className={cl.price}>
                    Цена
                    <span>
                      {price} <span> ₽</span>
                    </span>
                  </div>

                  <div className={cl.rating}>
                    Рейтинг
                    <Rating rating={rating} />
                  </div>

                  <div className={cl.ingredients}>
                    Состав:
                    <ul className={cl.ingredientsList}>
                      {ingredients.map((ingredient, index) => (
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
