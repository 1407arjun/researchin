import { getAuth, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth'

const auth = getAuth()
const provider = new GoogleAuthProvider()

export async function signin() {
  signInWithRedirect(auth, provider)
}
