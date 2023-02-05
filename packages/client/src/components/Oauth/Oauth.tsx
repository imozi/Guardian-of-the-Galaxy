import React from 'react'
import {
  useGetOAuthYandexServiceIdMutation,
  useSigninWithOAuthYandexMutation,
} from '../../store/auth/auth.api'
import { useGetUserQuery } from '../../store/user/user.api'
// import { selectServiceId } from '../../../redux/user/user.slice'
import { useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store'

const REDIRECT_URI = 'http://localhost:3000/'

const renderOAuthLink = (service_id: string, redirect_uri: string): string => {
  if (typeof service_id !== 'string') {
    return '#'
  }
  return `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${redirect_uri}`
}

const OAuthPanel: React.FC = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const service_id = useAppSelector(selectServiceId)

  const getAuthCode = () => {
    const code = location.search
    let res = null
    if (code) {
      res = code.replace('?code=', '')
    }
    return res
  }

  const handleOAuth = async (code: string, redirect_uri: string) => {
    const statusAction = await dispatch(
      signinWithOAuthYandex({ code, redirect_uri })
    )
    if (statusAction.payload) {
      dispatch(getProfile())
    } else {
      console.log(statusAction.payload)
    }
  }

  React.useEffect(() => {
    const oauthCode = getAuthCode()
    if (oauthCode) {
      handleOAuth(oauthCode, REDIRECT_URI)
    }
    dispatch(getOAuthYandexServiceId(REDIRECT_URI))
  }, [])

  const OAuthYandexLink = renderOAuthLink(service_id, REDIRECT_URI)

  return (
    //TODO ссылка
    <a href="OAuthYandexLink">Яндекс</a>
  )
}

export default OAuthPanel
