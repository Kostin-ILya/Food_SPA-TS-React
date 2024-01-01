import cl from './Aside.module.scss'

import { Button } from 'components/UI/Button'
import { UserProfile } from 'layouts/Aside/UserProfile'
import { Navigation } from 'layouts/Aside/Navigation'

// export interface AsideProps {

// }

export const Aside = (/* {}: AsideProps */) => {
  return (
    <aside className={cl.aside}>
      <UserProfile userName="Костин Илья" userEmail="admin@gmail.com" />

      <Navigation />

      <Button appearance="exit">
        <img src="/exit_icon.svg" alt="exit_icon" />
        Выход
      </Button>
    </aside>
  )
}
