import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'
import { NextApiRequest, NextApiResponse } from 'next'

import mongoose from 'mongoose'
import Publication from '@/models/Publication'

export default async function getPublishers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    await mongoose.connect(process.env.MONGODB_URI!)
    const pubs = await Publication.find().sort({ name: 1 })
    res.send(pubs)
  } else return res.status(401).end()
}
