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
    const prefs = await Preference.findOne({
      userId: session.user.id
    })
    //.populate('pubs')
    res.send(prefs)
  } else return res.status(401).end()
}
