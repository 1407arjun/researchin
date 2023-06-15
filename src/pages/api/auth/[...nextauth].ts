import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from '@/lib/mongodb'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profileUrl: 'https://www.googleapis.com/oauth2/v3/userinfo'
    })
  ],
  //@ts-ignore
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: '/login',
    signOut: '',
    newUser: '/onboarding'
  }
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, authOptions)
}