import mongoose from 'mongoose'

export const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  topics: { type: [String], required: true }
})

const Profile = mongoose.model('Profile', profileSchema)
export default Profile
