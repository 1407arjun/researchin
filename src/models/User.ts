import mongoose from 'mongoose'
import { AdapterUser } from 'next-auth/adapters'

export const userSchema = new mongoose.Schema<AdapterUser>({
  name: String,
  image: String,
  email: String,
  emailVerified: Date
})

export default mongoose.models.User ||
  mongoose.model<AdapterUser>('User', userSchema)
