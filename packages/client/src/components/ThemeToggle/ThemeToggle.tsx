import { FC } from 'react'
import { useAppSelector } from '@/store'
import { useUpdateThemeMutation } from '@/store/theme/theme.api'

export const ThemeToggle: FC = () => {
  const theme = useAppSelector(state => state.userState.theme)
  const user = useAppSelector(state => state.userState.user)
  const [updateTheme] = useUpdateThemeMutation()

  const setTheme = (name: string) => {
    if (user && name !== theme) {
      updateTheme({
        externalId: user.id,
        themeName: name,
      })
    }
  }

  return (
    <div className="theme-toggle">
      <div className="theme-toggle__item" onClick={() => setTheme('space')}>
        <div className="theme-toggle__pic">
          <img src="/images/space.gif" alt="space" width="60" />
        </div>
        <span className={`${theme === 'space' ? 'active' : ''}`}>space</span>
      </div>
      <div className="theme-toggle__item" onClick={() => setTheme('mars')}>
        <div className="theme-toggle__pic">
          <img src="/images/mars.gif" alt="mars" width="40" />
        </div>
        <span className={`${theme === 'mars' ? 'active' : ''}`}>mars</span>
      </div>
      <div className="theme-toggle__item" onClick={() => setTheme('saturn')}>
        <div className="theme-toggle__pic">
          <img src="/images/saturn.gif" alt="saturn" width="100" />
        </div>
        <span className={`${theme === 'saturn' ? 'active' : ''}`}>saturn</span>
      </div>
      <div className="theme-toggle__item" onClick={() => setTheme('uranus')}>
        <div className="theme-toggle__pic">
          <img src="/images/uranus.gif" alt="uranus" width="40" />
        </div>
        <span className={`${theme === 'uranus' ? 'active' : ''}`}>uranus</span>
      </div>
    </div>
  )
}
