import mongoose from 'mongoose'
import Preference from '@/types/preference'

export const preferenceSchema = new mongoose.Schema<Preference>({
  userId: {
    type: String,
    ref: 'User'
  },
  topics: { type: [String], required: true, lowercase: true },
  minYear: { type: Number, required: true },
  maxYear: { type: Number, required: true },
  pubIds: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Publication'
    }
  ]
})

export default mongoose.models.Preference ||
  mongoose.model<Preference>('Preference', preferenceSchema)
