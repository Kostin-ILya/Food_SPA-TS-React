import { User } from 'shared/interfaces'
import cl from './UserProfile.module.scss'

export interface UserProfileProps extends User {}

export const UserProfile = ({ name, email }: UserProfileProps) => {
  return (
    <div className={cl.userProfile}>
      <img className={cl.avatar} src="/images/user_avatar.svg" alt="avatar" />
      <h2 className={cl.name}>{name}</h2>
      <p className={cl.email}>{email}</p>
    </div>
  )
}
