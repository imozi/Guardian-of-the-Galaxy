import { Link } from 'react-router-dom'
import { Page } from '@/components/Page'
import { UserField } from '@/components/UI'
import { useAppSelector } from '@/store'
import { UserNav } from '@/components/UserNav'
import { UserType } from '@/types'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Audioplayer } from '@/components/AudioPlayer'

export const User = () => {
  const user = useAppSelector(state => state.userState.user) as UserType
  const titlePageName = `${
    user.displayName || user.firstName + ' ' + user.secondName
  }`

  return (
    <Page title={titlePageName}>
      <section className="user">
        <h3 className="visually-hidden">User Page</h3>
        <div className="user__overlay"></div>
        <div className="user__content">
          <UserField
            author={user.displayName || user.firstName}
            avatar={user.avatar}
          />
          <UserNav />
        </div>

        <Audioplayer url="sounds/a31df44c3944ea6.mp3" />

        <ThemeToggle />

        <Link className="user__play-link" to="/game">
          Play
        </Link>
      </section>
    </Page>
  )
}
