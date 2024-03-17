import { useEffect, useState } from 'react'
import { Grid as Spinner } from 'react-loader-spinner'
import { Link, useParams } from 'react-router-dom'
import { useHTTP } from 'hooks/useHTTP'
import { IoChevronBackCircleOutline as Back } from 'react-icons/io5'

import { Button } from 'components/UI/Button'
import { Rating } from 'components/Rating'
import { Title } from 'components/Title'

import { addToCart } from 'store/cart/cartSlice'
import { useAppDispatch } from 'hooks/redux'
import { IProduct } from 'shared/interfaces'
import cl from './ProductPage.module.scss'

export const ProductPage = () => {
  const [product, setProduct] = useState<IProduct>({} as IProduct)
  const { loadingStatus, request } = useHTTP()
  const param = useParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    request<IProduct>({ url: `/products/${param.id}` }).then((res) => {
      setProduct(res)
    })
  }, [param.id, request])

  const { id, name, ingredients, price, image, rating } = product

  if (loadingStatus === 'loading') {
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
      <header className={cl.header}>
        <Title>{name}</Title>

        <div className={cl.buttons}>
          <Link to="/" className={cl.back}>
            <Back />
          </Link>

          <Button
            appearance="withIcon"
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
        </div>
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
              {ingredients &&
                ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
            </ul>
          </div>
        </div>
      </main>

      <div className={cl.description}>{product.description}</div>
    </>
  )
}
