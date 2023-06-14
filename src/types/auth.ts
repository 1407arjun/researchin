import { User } from 'realm-web'

export enum AuthStatus {
  LOADING,
  UNAUTHENTICATED,
  AUTHENTICATED
}

interface Auth {
  status: AuthStatus
  user: User | null
}

export default Auth
