import { useEffect, useState } from 'react'
import { App, getApp } from 'realm-web'

export function useApp() {
  const [app, setApp] = useState<App | null>(null)
  useEffect(() => {
    //@ts-ignore
    setApp(getApp(process.env.NEXT_PUBLIC_APP_ID!))
  }, [])
  return app
}
