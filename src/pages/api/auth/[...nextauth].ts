import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from '@/lib/mongodb'
import Preference from '@/models/Preference'
import mongoose from 'mongoose'
import { APP_MAX_YEAR, APP_MIN_YEAR } from '@/constants/preferences'

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
    signIn: '/auth/login',
    signOut: '',
    newUser: '/app'
  },
  events: {
    createUser: async ({ user }) => {
      const pref = new Preference({
        user: new mongoose.Types.ObjectId(user.id),
        topics: [],
        minYear: APP_MAX_YEAR - 2,
        maxYear: APP_MAX_YEAR,
        pubs: []
      })
      pref.save()
    }
  }
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, authOptions)
}
