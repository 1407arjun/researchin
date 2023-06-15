import mongoose from 'mongoose'

export const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  email: { type: String, required: true },
  emailVerified: Boolean
})

const User = mongoose.model('User', userSchema)
export default User
