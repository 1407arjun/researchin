import Auth, { AuthStatus } from '@/types/auth'
import { useApp } from './useApp'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth, setStatus, setUser } from '@/store/slices/auth'
import { getApp } from 'realm-web'

export default function useAuth(): Auth {
  const app = getApp(process.env.NEXT_PUBLIC_APP_ID!)
  const dispatch = useDispatch()
  const { user } = useSelector(getAuth)

  useEffect(() => {
    console.log(app, app?.currentUser)
    if (app) {
      if (app.currentUser) {
        dispatch(setStatus(AuthStatus.AUTHENTICATED))
        dispatch(setUser(app.currentUser))
      } else {
        dispatch(setStatus(AuthStatus.UNAUTHENTICATED))
        dispatch(setUser(null))
      }
    } else {
      dispatch(setStatus(AuthStatus.LOADING))
      dispatch(setUser(null))
    }
  }, [app, app?.currentUser, user])

  return useSelector(getAuth)
}
