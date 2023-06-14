import Loading from '@/components/auth/Loading'
import { useApp } from '@/hooks/useApp'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Signout() {
  const app = useApp()
  const router = useRouter()
  useEffect(() => {
    if (app && app.currentUser) app.currentUser.logOut()
    router.replace('/')
  }, [])
  return <Loading />
}
