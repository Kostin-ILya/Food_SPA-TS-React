import { Outlet } from 'react-router-dom'

import { Aside } from './Aside'

import cl from './MainLayout.module.scss'

export interface MainLayoutProps {}

export const MainLayout = () => {
  return (
    <div className={cl.mainLayout}>
      <Aside />

      <main className={cl.content}>
        <Outlet />
        <footer className={cl.footer}>
          <a href="https://github.com/Kostin-ilya" target="_blank">
            © 2024 Kostin Ilia. Все права защищены.
          </a>
        </footer>
      </main>
    </div>
  )
}
