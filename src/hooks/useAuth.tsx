import Auth, { AuthStatus } from '@/types/auth'
import { useApp } from './useApp'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth, setStatus, setUser } from '@/store/slices/auth'

export default function useAuth(): Auth {
  const app = useApp()
  const { status, user } = useSelector(getAuth)
  const dispatch = useDispatch()

  useEffect(() => {
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
  }, [app, app?.currentUser])

  return { status, user }
}
