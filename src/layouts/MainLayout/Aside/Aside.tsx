import cl from './Aside.module.scss'

import { Button } from 'components/UI/Button'
import { UserProfile } from 'layouts/MainLayout/Aside/UserProfile'
import { Navigation } from 'layouts/MainLayout/Aside/Navigation'
import { useNavigate } from 'react-router-dom'

export const Aside = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('jwt')
    navigate('/auth/login')
  }

  return (
    <aside className={cl.aside}>
      <UserProfile userName="Костин Илья" userEmail="admin@gmail.com" />

      <Navigation />

      <Button appearance="exit" onClick={handleLogout}>
        <img src="/icons/exit_icon.svg" alt="exit_icon" />
        Выход
      </Button>
    </aside>
  )
}
