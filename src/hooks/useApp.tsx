import { useEffect, useState } from 'react'
import { getApp } from 'realm-web'

export function useApp() {
  const [app, setApp] = useState(null)
  useEffect(() => {
    //@ts-ignore
    setApp(getApp(process.env.NEXT_PUBLIC_APP_ID!))
  }, [])
  return app
}
