import cl from './Aside.module.scss'

import { Button } from 'components/UI/Button'
import { UserProfile } from 'layouts/MainLayout/Aside/UserProfile'
import { Navigation } from 'layouts/MainLayout/Aside/Navigation'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from 'hooks/redux'
import { getUserInfo } from 'store/slice/userSlice'

export const Aside = () => {
  const navigate = useNavigate()
  const { email, name } = useAppSelector(getUserInfo)

  const handleLogout = () => {
    localStorage.removeItem('jwt')
    navigate('/auth/login')
  }

  return (
    <aside className={cl.aside}>
      {<UserProfile name={name || 'Админ'} email={email || 'admin@ya.ru'} />}

      <Navigation />

      <Button appearance="exit" onClick={handleLogout}>
        <img src="/icons/exit_icon.svg" alt="exit_icon" />
        Выход
      </Button>
    </aside>
  )
}
