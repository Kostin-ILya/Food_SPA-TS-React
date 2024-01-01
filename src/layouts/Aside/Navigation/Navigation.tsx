import cl from './Navigation.module.scss'

// export interface NavigationProps {}

export const Navigation = () => {
  return (
    <nav className={cl.navigation}>
      <a href="#" className={cl.link}>
        <img src="/menu_icon.svg" alt="menu" />
        Меню
      </a>

      <a href="#" className={cl.link}>
        <img src="/cart_icon.svg" alt="cart" />
        Корзина
      </a>
    </nav>
  )
}
