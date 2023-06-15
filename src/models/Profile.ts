import mongoose from 'mongoose'

export const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  topics: { type: [String], required: true }
})

export default mongoose.models.Profile ||
  mongoose.model('Profile', profileSchema)
