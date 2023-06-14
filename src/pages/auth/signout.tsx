import Loading from '@/components/auth/Loading'
import { useApp } from '@/hooks/useApp'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Signout() {
  const app = useApp()
  const router = useRouter()
  useEffect(() => {
    async function logout() {
      if (app && app.currentUser) await app.currentUser.logOut()
      router.replace('/')
    }
    logout()
  }, [])
  return <Loading />
}
