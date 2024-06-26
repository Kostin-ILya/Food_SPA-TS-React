import { CartItem as TCartItem } from 'shared/interfaces/'
import { useAppDispatch } from 'hooks/redux'
import { motion } from 'framer-motion'

import {
  decreaseCount,
  increaseCount,
  removeFromCart,
} from 'store/cart/cartSlice'
import cl from './CartItem.module.scss'

export interface CartItemProps extends TCartItem {}

export const CartItem = ({ id, name, price, image, count }: CartItemProps) => {
  const dispatch = useAppDispatch()

  return (
    <motion.div
      className={cl.cartItem}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.7 }}
    >
      <div className={cl.content}>
        <div className={cl.imgContainer}>
          <img src={image} alt={name} />
        </div>
        <div className={cl.info}>
          <h3>{name}</h3>
          <div className={cl.price}>
            {price} <span>₽</span>
          </div>
        </div>
      </div>

      <div className={cl.count}>
        <div className={cl.buttons}>
          <div className={cl.minus} onClick={() => dispatch(decreaseCount(id))}>
            <img src="/icons/minus.svg" alt="minus" />
          </div>

          <span>{count}</span>

          <div className={cl.plus} onClick={() => dispatch(increaseCount(id))}>
            <img src="/icons/plus.svg" alt="plus" />
          </div>
        </div>

        <img
          className={cl.delete}
          onClick={() => dispatch(removeFromCart(id))}
          src="/icons/delete_icon.svg"
          alt="delete"
        />
      </div>
    </motion.div>
  )
}
