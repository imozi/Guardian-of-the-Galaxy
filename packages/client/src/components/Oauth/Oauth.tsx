import React, { useEffect } from 'react'
import {
  useGetOAuthYandexServiceIdMutation,
  useSigninWithOAuthYandexMutation,
} from '../../store/auth/auth.api'
import { useGetUserQuery } from '../../store/user/user.api'
import { selectServiceId } from '../../store/user/userSlice'
import { Link, redirect, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store'

const REDIRECT_URI = 'http://localhost:3000'

const renderOAuthLink = (service_id: string, redirect_uri: string): string => {
  if (typeof service_id !== 'string') {
    return '#'
  }
  const encoded =  encodeURIComponent(redirect_uri);
  // alert(encoded)
  return `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${redirect_uri}`
}

const OAuthPanel: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  // const dispatch = useAppDispatch()
  const service_id = useAppSelector(selectServiceId)
  const isAuth = useAppSelector(state => state.userState.isAuth)

  const [getOAuthYandexServiceId] = useGetOAuthYandexServiceIdMutation()
  const [signinWithOAuthYandex, { isSuccess}] = useSigninWithOAuthYandexMutation()
  // const [getUser] = useGetUserQuery()

  // const [{isSuccess}] = useGetUserQuery()

  // useEffect(() => {
  //   if (isSuccess) {
  //     navigate('/user')
  //   }
  // }, [isSuccess, navigate])

  const getAuthCode = () => {
    const code = location.search
    console.log(location)
    let res = null
    if (code) {
      res = code.replace('?code=', '')
    }
    // alert(res)
    return res
  }

  const handleOAuth = async (code: string, redirect_uri: string) => {
    // alert(code)
    console.log(code, redirect_uri)
    // const statusAction = await signinWithOAuthYandex({ code, redirect_uri })
    // console.log('statusAction', statusAction)
    // if (statusAction) {
    //   // dispatch(getProfile())
    //   navigate('/user')
    // } else {
    //   console.log(statusAction)
    // }
  const t = await signinWithOAuthYandex({ code, redirect_uri })
  // alert(t)
    
    // navigate('/user')
  }

  const yandexServiceId = async () => {
    // alert(REDIRECT_URI)
    const t = await getOAuthYandexServiceId({
      redirect_uri: REDIRECT_URI
    })
    // alert(t)
    return t
  }
  // useEffect(()=> {
  //   // alert(service_id)
  //   // if(service_id) {
  //     const oauthCode = getAuthCode()
  //     // alert(oauthCode)
  //     // if(oauthCode) {
  //     //   handleOAuth(oauthCode, REDIRECT_URI)
  //     // }
  //   // }
  // }, [service_id])

  useEffect(() => {
    
    yandexServiceId()

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
