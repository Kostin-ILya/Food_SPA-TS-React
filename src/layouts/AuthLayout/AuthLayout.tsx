import { AnimatedOutlet } from 'utils/AnimatedOutlet'

import cl from './AuthLayout.module.scss'

export const AuthLayout = () => {
  return (
    <div className={cl.authLayout}>
      <div className={cl.logo}>
        <img src="/images/logo.svg" alt="logo" />
      </div>

      <div className={cl.content}>
        <AnimatedOutlet />
      </div>
    </div>
  )
}
