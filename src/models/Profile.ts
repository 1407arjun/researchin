import mongoose from 'mongoose'
import Profile from '@/types/profile'

export const profileSchema = new mongoose.Schema<Profile>({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  topics: { type: [String], required: true }
})

export default mongoose.models.Profile ||
  mongoose.model<Profile>('Profile', profileSchema)
