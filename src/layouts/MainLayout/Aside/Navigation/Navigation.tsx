import { NavLink } from 'react-router-dom'
import { GiFullPizza } from 'react-icons/gi'
import { FaShoppingCart } from 'react-icons/fa'
import clsx from 'clsx'

import { useAppSelector } from 'hooks/redux'
import { getCartItems } from 'store/cart/cartSlice'

import cl from './Navigation.module.scss'

export const Navigation = () => {
  const cartItems = useAppSelector(getCartItems)

  return (
    <nav className={cl.navigation}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          clsx(
            cl.link,
            (isActive || location.pathname.includes('product')) && cl.active
          )
        }
      >
        <GiFullPizza className={cl.icon} />
        Меню
      </NavLink>

      <NavLink
        to="/cart"
        className={({ isActive }) => clsx(cl.link, isActive && cl.active)}
      >
        <FaShoppingCart className={cl.icon} />
        Корзина
        {cartItems.length > 0 && (
          <span className={cl.count}>
            {cartItems.reduce((acc, item) => acc + item.count, 0)}
          </span>
        )}
      </NavLink>
    </nav>
  )
}
