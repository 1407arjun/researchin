import { getApp, setApp } from '@/store/slices/app'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { App, getApp as getRealmApp } from 'realm-web'

export function useApp(): App | null {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setApp(getRealmApp(process.env.NEXT_PUBLIC_APP_ID!)))
  }, [])

  return useSelector(getApp).app
}
