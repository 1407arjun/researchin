import mongoose from 'mongoose'
import { AdapterSession } from 'next-auth/adapters'

export const sessionSchema = new mongoose.Schema<AdapterSession>(
  {
    expires: Date,
    sessionToken: String,
    userId: { type: String, ref: 'User' }
  },
  { timestamps: true }
)

export default mongoose.models.Session ||
  mongoose.model<AdapterSession>('Session', sessionSchema)
