import { Auth as FirebaseAuth, GoogleAuthProvider, User } from 'firebase/auth'

interface Auth {
  auth: FirebaseAuth
  isLoggedIn: boolean
  provider: GoogleAuthProvider
  currentUser: User | null
}

export default Auth
