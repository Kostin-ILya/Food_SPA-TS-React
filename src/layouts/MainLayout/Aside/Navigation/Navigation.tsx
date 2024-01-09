import { NavLink } from 'react-router-dom'

import clsx from 'clsx'

import cl from './Navigation.module.scss'

// export interface NavigationProps {}

export const Navigation = () => {
  return (
    <nav className={cl.navigation}>
      <NavLink
        to="/"
        className={({ isActive }) => clsx(cl.link, isActive && cl.active)}
      >
        <img src="/menu_icon.svg" alt="menu" />
        Меню
      </NavLink>

      <NavLink
        to="/cart"
        className={({ isActive }) => clsx(cl.link, isActive && cl.active)}
      >
        <img src="/cart_icon.svg" alt="cart" />
        Корзина
      </NavLink>
    </nav>
  )
}
