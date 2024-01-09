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
      </main>
    </div>
  )
}
