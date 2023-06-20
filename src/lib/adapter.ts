import { DefaultAdapter } from 'next-auth/adapters'
import mongoose from 'mongoose'
import User from '@/models/User'
import Account from '@/models/Account'
import Session from '@/models/Session'
import Preference from '@/models/Preference'

export default function MongooseAdapter(
  client: Promise<typeof mongoose>
): DefaultAdapter {
  return {
    async createUser(user) {
      await client
      return await new User(user).save()
    },
    async getUser(id) {
      await client
      return await User.findById(id)
    },
    async getUserByEmail(email) {
      await client
      return await User.findOne({ email })
    },
    async getUserByAccount({ providerAccountId, provider }) {
      await client
      const account = await Account.findOne({ provider, providerAccountId })
      if (!account) return null
      return await User.findById(account.userId)
    },
    async updateUser(user) {
      await client
      const result = await User.findByIdAndUpdate(
        user.id,
        { $set: user },
        { returnDocument: 'after' }
      )
      return result
    },
    async deleteUser(userId) {
      await client
      await Promise.all([
        Preference.deleteOne({ userId: userId }),
        Account.deleteMany({ userId: userId }),
        Session.deleteMany({ userId: userId }),
        User.deleteOne({ id: userId })
      ])
    },
    async linkAccount(account) {
      await client
      return await new Account(account).save()
    },
    async unlinkAccount({ providerAccountId, provider }) {
      await client
      const result = await Account.findOneAndDelete({
        provider,
        providerAccountId
      })
      return result
    },
    async createSession({ sessionToken, userId, expires }) {
      await client
      return await new Session({
        sessionToken,
        expires,
        userId: userId
      }).save()
    },
    async getSessionAndUser(sessionToken) {
      await client
      const session = await Session.findOne({ sessionToken })
      if (!session) return null

      const user = await User.findById(session.userId)
      if (!user) return null

      return {
        user,
        session
      }
    },
    async updateSession(session) {
      await client
      const result = await Session.findOneAndUpdate(
        { sessionToken: session.sessionToken },
        { $set: session },
        { returnDocument: 'after' }
      )
      return result
    },
    async deleteSession(sessionToken) {
      await client
      await Session.findOneAndDelete({ sessionToken })
    }
  }
}
