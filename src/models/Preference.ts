import mongoose from 'mongoose'
import Preference from '@/types/preference'

export const preferenceSchema = new mongoose.Schema<Preference>({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  topics: { type: [String], required: true },
  min_year: Number,
  max_year: Number,
  pub: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Publication'
    }
  ]
})

export default mongoose.models.Preference ||
  mongoose.model<Preference>('Preference', preferenceSchema)
