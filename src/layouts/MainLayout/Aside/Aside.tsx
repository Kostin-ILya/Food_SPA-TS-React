import cl from './Aside.module.scss'

import { Button } from 'components/UI/Button'
import { UserProfile } from 'layouts/MainLayout/Aside/UserProfile'
import { Navigation } from 'layouts/MainLayout/Aside/Navigation'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from 'hooks/redux'
import { selectUserInfo } from 'store/slice/userSlice'

export const Aside = () => {
  const navigate = useNavigate()
  const { email, name } = useAppSelector(selectUserInfo)

  console.log(email, name)

  const handleLogout = () => {
    localStorage.removeItem('jwt')
    navigate('/auth/login')
  }

  return (
    <aside className={cl.aside}>
      {email && name && <UserProfile name={name} email={email} />}

      <Navigation />

      <Button appearance="exit" onClick={handleLogout}>
        <img src="/icons/exit_icon.svg" alt="exit_icon" />
        Выход
      </Button>
    </aside>
  )
}
