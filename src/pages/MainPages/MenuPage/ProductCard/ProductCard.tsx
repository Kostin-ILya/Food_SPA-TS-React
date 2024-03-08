import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import { IProduct } from 'shared/interfaces'
import { Rating } from 'components/Rating'
import { useAppDispatch } from 'hooks/redux'
import { addToCart } from 'store/cart/cartSlice'

import cl from './ProductCard.module.scss'

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
    <motion.div
      className={cl.card}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      <Link to={`/product/${id}`}>
        <div
          className={cl.imgContainer}
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className={cl.price}>
            {price} <span>₽</span>
          </div>

          <motion.button
            className={cl.buyIcon}
            onClick={handleAddToCart}
            whileHover={{
              scale: 1.2,
            }}
            whileTap={{ scale: 0.9 }}
          >
            <img src="/icons/cart_icon.svg" alt="Buy" />
          </motion.button>

          <Rating rating={rating} absolute />
        </div>

        <div className={cl.info}>
          <h3>{name}</h3>

          <p>{ingredients.join(', ')}</p>
        </div>
      </Link>
    </motion.div>
  )
}
