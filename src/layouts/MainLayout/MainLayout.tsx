import { AnimatedOutlet } from 'utils/AnimatedOutlet'
import { Aside } from './Aside'

import cl from './MainLayout.module.scss'

export interface MainLayoutProps {}

export const MainLayout = () => {
  return (
    <div className={cl.mainLayout}>
      <Aside />

      <div className={cl.content}>
        <AnimatedOutlet />

        <footer className={cl.footer}>
          <a href="https://github.com/Kostin-ilya" target="_blank">
            © 2024 Kostin Ilia. Все права защищены.
          </a>
        </footer>
      </div>
    </div>
  )
}
