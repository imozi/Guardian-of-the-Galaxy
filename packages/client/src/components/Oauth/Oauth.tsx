import React, { useEffect } from 'react'
import { useGetOAuthYandexServiceIdMutation } from '../../store/auth/auth.api'
import { selectServiceId } from '../../store/user/userSlice'
import { useAppSelector } from '@/store'
import { REDIRECT_URL } from '@/core/consts'

const redirectUri = REDIRECT_URL

const renderOAuthLink = (serviceId: string, redirectUri: string): string => {
  if (typeof serviceId !== 'string') {
    return '#'
  }

  return `https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=${redirectUri}`
}

const OAuthPanel: React.FC = () => {
  const serviceId = useAppSelector(selectServiceId)
  const [getOAuthYandexServiceId] = useGetOAuthYandexServiceIdMutation()

  const yandexServiceId = async () => {
    return await getOAuthYandexServiceId({
      redirect_uri: redirectUri,
    })
  }

  useEffect(() => {
    void yandexServiceId()
  }, [])

  const OAuthYandexLink = renderOAuthLink(serviceId, redirectUri)

  return (
    <a href={OAuthYandexLink}>
      <img className="img-yandex" src="/images/yandex.svg" />
    </a>
  )
}

export default OAuthPanel
