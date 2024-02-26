import { CartItem as TCartItem } from 'shared/interfaces/'
import cl from './CartItem.module.scss'

export interface CartItemProps extends TCartItem {}

export const CartItem = ({ id, name, price, image, count }: CartItemProps) => {
  return (
    <div className={cl.cartItem}>
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
          <div className={cl.minus}>
            <img src="/icons/minus.svg" alt="minus" />
          </div>

          <span>{count}</span>

          <div className={cl.plus}>
            <img src="/icons/plus.svg" alt="plus" />
          </div>
        </div>

        <img className={cl.delete} src="/icons/delete_icon.svg" alt="delete" />
      </div>
    </div>
  )
}
