import React, { useEffect } from 'react'
import { useGetOAuthYandexServiceIdMutation } from '../../store/auth/auth.api'
import { selectServiceId } from '../../store/user/userSlice'
import { useAppSelector } from '@/store'

const REDIRECT_URI = 'http://localhost:3000'

const renderOAuthLink = (service_id: string, redirect_uri: string): string => {
  if (typeof service_id !== 'string') {
    return '#'
  }

  return `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${redirect_uri}`
}

const OAuthPanel: React.FC = () => {
  const service_id = useAppSelector(selectServiceId)
  const [getOAuthYandexServiceId] = useGetOAuthYandexServiceIdMutation()

  const yandexServiceId = async () => {
    return await getOAuthYandexServiceId({
      redirect_uri: REDIRECT_URI,
    })
  }

  useEffect(() => {
    yandexServiceId()
  }, [])

  const OAuthYandexLink = renderOAuthLink(service_id, REDIRECT_URI)

  return (
    <a href={OAuthYandexLink}>
      <img className="img-yandex" src="/images/yandex.svg" />
    </a>
  )
}

export default OAuthPanel
