import { RotatingLines } from 'react-loader-spinner'

import { User } from 'shared/interfaces'
import cl from './UserProfile.module.scss'

export interface UserProfileProps extends User {
  isLoading: boolean
}

export const UserProfile = ({ name, email, isLoading }: UserProfileProps) => {
  return (
    <div className={cl.userProfile}>
      <img className={cl.avatar} src="/images/user_avatar.svg" alt="avatar" />
      <h2 className={cl.name}>{name}</h2>
      <p className={cl.email}>{email}</p>

      {isLoading && (
        <div className={cl.spinner}>
          <RotatingLines strokeColor="var(--main-color)" width="50" />
        </div>
      )}
    </div>
  )
}
