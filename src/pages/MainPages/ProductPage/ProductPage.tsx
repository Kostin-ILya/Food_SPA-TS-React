import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { Button } from 'components/UI/Button'
import { Rating } from 'components/Rating'
import { Title } from 'components/Title'

import { addToCart } from 'store/cart/cartSlice'
import { useAppDispatch } from 'hooks/redux'
import { IProduct } from 'shared/interfaces'
import cl from './ProductPage.module.scss'

export const ProductPage = () => {
  const [product, setProduct] = useState<IProduct>({} as IProduct)
  const param = useParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    axios.get<IProduct>(`/products/${param.id}`).then((res) => {
      setProduct(res.data)
    })
  }, [param.id])

  const { id, name, ingredients, price, image, rating } = product

  return (
    <>
      <header className={cl.header}>
        <Title>{name}</Title>
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
    </>
  )
}
