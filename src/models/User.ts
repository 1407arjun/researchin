import User from '@/types/user'
import mongoose from 'mongoose'

export const userSchema = new mongoose.Schema<User>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  email: { type: String, required: true },
  emailVerified: Boolean
})

export default mongoose.models.User || mongoose.model<User>('User', userSchema)
