import Loading from '@/components/auth/Loading'
import { useEffect } from 'react'
import { handleAuthRedirect } from 'realm-web'

export default function GoogleAuth() {
  useEffect(() => {
    handleAuthRedirect()
  }, [])
  return <Loading />
}
