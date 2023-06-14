import { User, getApp } from 'realm-web'

export default function getAuthStatus() {
  const app = getApp(process.env.NEXT_PUBLIC_APP_ID!)
  console.log(app.currentUser)
  return app.currentUser
}
