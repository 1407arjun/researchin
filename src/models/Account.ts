import mongoose from 'mongoose'
import { AdapterAccount } from 'next-auth/adapters'

export const accountSchema = new mongoose.Schema<AdapterAccount>(
  {
    userId: { type: String, ref: 'User' },
    type: String,
    provider: String,
    providerAccountId: String,
    refresh_token: String,
    access_token: String,
    expires_at: Number,
    token_type: String,
    scope: String,
    session_state: String
  },
  { timestamps: true }
)

export default mongoose.models.Account ||
  mongoose.model<AdapterAccount>('Account', accountSchema)
