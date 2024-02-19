import { NavLink } from 'react-router-dom'

import clsx from 'clsx'

import cl from './Navigation.module.scss'
import { useAppSelector } from 'hooks/redux'
import { getCartItems } from 'store/cart/cartSlice'

export const Navigation = () => {
  const cartItems = useAppSelector(getCartItems)

  return (
    <nav className={cl.navigation}>
      <NavLink
        to="/"
        className={({ isActive }) => clsx(cl.link, isActive && cl.active)}
      >
        <img src="/icons/menu_icon.svg" alt="menu" />
        Меню
      </NavLink>

      <NavLink
        to="/cart"
        className={({ isActive }) => clsx(cl.link, isActive && cl.active)}
      >
        <img src="/icons/cart_navigate_icon.svg" alt="cart" />
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
