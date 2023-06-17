import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import clientPromise from '@/lib/mongodb'
import Preference from '@/models/Preference'
import mongoose from 'mongoose'
import { APP_MAX_YEAR } from '@/constants/preferences'
import MongooseAdapter from '@/lib/adapter'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profileUrl: 'https://www.googleapis.com/oauth2/v3/userinfo'
    })
  ],
  adapter: MongooseAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: '/auth/login',
    signOut: '',
    newUser: '/app/preferences'
  },
  callbacks: {
    session: ({ session, user }) => {
      session.user.id = user.id
      return session
    }
  },
  events: {
    createUser: async ({ user }) => {
      await mongoose.connect(process.env.MONGODB_URI!)
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
