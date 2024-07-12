import { AnimatedOutlet } from 'utils/AnimatedOutlet'
import { Suspense } from 'react'

import cl from './AuthLayout.module.scss'

export const AuthLayout = () => {
  return (
    <div className={cl.authLayout}>
      <Suspense fallback={null}>
        <div className={cl.logo}>
          <img src="/images/logo.svg" alt="logo" />
        </div>

        <div className={cl.content}>
          <AnimatedOutlet />
        </div>
      </Suspense>
    </div>
  )
}

export default AuthLayout
