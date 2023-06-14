import { useEffect } from 'react'
import { handleAuthRedirect } from 'realm-web'

export default function GoogleAuth() {
  useEffect(() => {
    handleAuthRedirect()
  }, [])
  return <h1>Loading...</h1>
}
