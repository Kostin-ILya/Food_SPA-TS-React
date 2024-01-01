import cl from './UserProfile.module.scss'

export interface UserProfileProps {
  userName: string
  userEmail: string
}

export const UserProfile = ({ userName, userEmail }: UserProfileProps) => {
  return (
    <div className={cl.userProfile}>
      <img className={cl.avatar} src="/user_avatar.svg" alt="avatar" />
      <h2 className={cl.name}>{userName}</h2>
      <p className={cl.email}>{userEmail}</p>
    </div>
  )
}
