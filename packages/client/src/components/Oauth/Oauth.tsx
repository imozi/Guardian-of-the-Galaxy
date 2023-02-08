import React from 'react'
// import {
//   useGetOAuthYandexServiceIdMutation,
//   useSigninWithOAuthYandexMutation,
// } from '../../store/auth/auth.api'
import { useGetUserQuery } from '../../store/user/user.api'
import { selectServiceId } from '../../store/user/userSlice'
import { Link, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store'

const REDIRECT_URI = 'http://localhost:3000/profile'

const renderOAuthLink = (service_id: string, redirect_uri: string): string => {
  // console.log(service_id, redirect_uri)
  // if (typeof service_id !== 'string') {
  //   return '#'
  // }
  // return `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${redirect_uri}`
  return `https://oauth.yandex.ru/authorize?response_type=code&client_id=87f0d0cea14b4eb6966b52299714ac0e&redirect_uri=http://localhost:3000/profile`
}

const OAuthPanel: React.FC = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const service_id = useAppSelector(selectServiceId)
  const isAuth = useAppSelector(state => state.userState.user)

  // const [getOAuthYandexServiceId] = useGetOAuthYandexServiceIdMutation()
  // const [signinWithOAuthYandex] = useSigninWithOAuthYandexMutation()

  const getAuthCode = () => {
    const code = location.search
    console.log(location)
    let res = null
    if (code) {
      res = code.replace('?code=', '')
    }
    return res
  }

  const handleOAuth = async (code: string, redirect_uri: string) => {
    // const statusAction = await dispatch(
    // signinWithOAuthYandex({ code, redirect_uri })
    console.log(2)
    // const t = await signinWithOAuthYandex({
    //   data: {
    //     code: code,
    //     redirect_uri: redirect_uri,
    //   },
    // })
    // console.log('signinWithOAuthYandex', t)
    // return t
    // )
    // if (statusAction.payload) {
    //   dispatch(getProfile())
    // } else {
    //   console.log(statusAction.payload)
    // }
  }

  const yandex = async () => {
    // const t = await getOAuthYandexServiceId({
    //   data: {
    //     REDIRECT_URI,
    //   },
    // // })
    // setServiceIdUser(t)
    // console.log(t)
    // return t
  }
  React.useEffect(() => {
    console.log('OAuthYandexLink', OAuthYandexLink)
    console.log(1)
    const oauthCode = getAuthCode()
    console.log(oauthCode)
    if (oauthCode) {
      handleOAuth(oauthCode, REDIRECT_URI)
    }
    const t = yandex()
    console.log('getOAuthYandexServiceId', t)
    // setServiceIdUser(t)

    // dispatch(t)
  }, [])

  const OAuthYandexLink = renderOAuthLink(service_id, REDIRECT_URI)
 
  return (
    //TODO ссылка
    // <Link className="link" to=`${OAuthYandexLink}`>
    //         Leaderboard
    //       </Link>
    // <div onClick={OAuthYandexLink}></div>
    <a href={OAuthYandexLink}>Яндекс</a>
  )
}

export default OAuthPanel
