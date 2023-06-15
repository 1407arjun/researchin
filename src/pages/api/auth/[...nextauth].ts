import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profileUrl: 'https://www.googleapis.com/oauth2/v3/userinfo'
    })
  ],
  secret: process.env.AUTH_SECRET!,
  pages: {
    signIn: '/login',
    signOut: '',
    newUser: '/onboarding'
  }
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, authOptions)
}
