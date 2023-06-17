import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'
import { NextApiRequest, NextApiResponse } from 'next'

import mongoose from 'mongoose'
import Preference from '@/models/Preference'

export default async function getPreferences(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    await mongoose.connect(process.env.MONGODB_URI!)
    const pubs = await Preference.findOne({ user: session.user.id })
    res.send(pubs)
  } else return res.status(401).end()
}
