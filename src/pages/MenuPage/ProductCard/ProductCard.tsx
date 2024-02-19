import { Link } from 'react-router-dom'

import cl from './ProductCard.module.scss'
import { IProduct } from 'shared/interfaces'
import { Rating } from 'components/Rating'
import { useAppDispatch } from 'hooks/redux'
import { addToCart } from 'store/cart/cartSlice'

export interface ProductCardProps extends IProduct {}

export const ProductCard = ({
  name,
  ingredients,
  price,
  image,
  id,
  rating,
}: ProductCardProps) => {
  const dispatch = useAppDispatch()

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(addToCart({ id, name, price, image }))
  }
  return (
    <Link to={`/product/${id}`} className={cl.productCard}>
      <div
        className={cl.imgContainer}
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className={cl.price}>
          {price} <span>₽</span>
        </div>

        <button className={cl.buyIcon} onClick={handleAddToCart}>
          <img src="/icons/cart_icon.svg" alt="Buy" />
        </button>

        <Rating rating={rating} absolute />
      </div>

      <div className={cl.info}>
        <h3>{name}</h3>

        <p>{ingredients.join(', ')}</p>
      </div>
    </Link>
  )
}
