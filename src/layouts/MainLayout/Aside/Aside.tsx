import cl from './Aside.module.scss'

import { Button } from 'components/UI/Button'
import { UserProfile } from 'layouts/MainLayout/Aside/UserProfile'
import { Navigation } from 'layouts/MainLayout/Aside/Navigation'

// export interface AsideProps {

// }

export const Aside = (/* {}: AsideProps */) => {
  return (
    <aside className={cl.aside}>
      <UserProfile userName="Костин Илья" userEmail="admin@gmail.com" />

      <Navigation />

      <Button appearance="exit">
        <img src="/icons/exit_icon.svg" alt="exit_icon" />
        Выход
      </Button>
    </aside>
  )
}
