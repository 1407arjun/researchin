import AuthScreen from '@/components/auth/AuthScreen'

import getAuthStatus from '@/utils/auth/getAuthStatus'

export function getServerSideProps() {
  const session = getAuthStatus()
  if (session) {
    return {
      redirect: {
        destination: '/home'
      }
    }
  }
  return { props: {} }
}

export default function Login() {
  return <AuthScreen />
}
