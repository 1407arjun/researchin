import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'
import { NextApiRequest, NextApiResponse } from 'next'

import Preference from '@/models/Preference'
import clientPromise from '@/lib/mongodb'

export default async function getPreferences(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)
  const authorization = req.headers['x-client-authorization']

  if (session && authorization && session.user.id === authorization) {
    if (req.method === 'GET') {
      await clientPromise
      const prefs = await Preference.findOne({
        userId: session.user.id
      })
      //.populate('pubs')
      res.send(prefs)
    } else if (req.method === 'PUT') {
      await clientPromise
      const prefs = await Preference.updateOne(
        { userId: session.user.id },
        { $set: JSON.parse(req.body) }
      )
      res.send(prefs)
    } else return res.status(405).redirect('/')
  } else return res.status(401).redirect('/')
}
