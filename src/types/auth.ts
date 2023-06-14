import { User } from 'firebase/auth'

interface Auth {
  isLoggedIn: boolean
  currentUser: User | null
}

export default Auth
