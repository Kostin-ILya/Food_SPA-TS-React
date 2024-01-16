import { NavLink, useLocation } from 'react-router-dom'

import clsx from 'clsx'

import cl from './Navigation.module.scss'

// export interface NavigationProps {}

export const Navigation = () => {
  const location = useLocation()

  return (
    <nav className={cl.navigation}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          clsx(
            cl.link,
            (isActive && cl.active) ||
              (location.pathname === '/menu' && cl.active)
          )
        }
      >
        <img src="/icons/menu_icon.svg" alt="menu" />
        Меню
      </NavLink>

      <NavLink
        to="/cart"
        className={({ isActive }) => clsx(cl.link, isActive && cl.active)}
      >
        <img src="/icons/cart_icon.svg" alt="cart" />
        Корзина
      </NavLink>
    </nav>
  )
}
