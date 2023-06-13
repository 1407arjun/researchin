import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult
} from 'firebase/auth'
import { app } from '../firebase'

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export async function signin() {
  signInWithRedirect(auth, provider)
}
