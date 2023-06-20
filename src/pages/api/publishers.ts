import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'
import { NextApiRequest, NextApiResponse } from 'next'

import Publication from '@/models/Publication'
import clientPromise from '@/lib/mongodb'

export default async function getPublishers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)
  const authorization = req.headers['x-client-authorization']

  if (session && authorization && session.user.id === authorization) {
    if (req.method === 'GET') {
      await clientPromise
      const pubs = await Publication.find().sort({ name: 1 })
      res.send(pubs)
    } else return res.status(405).redirect('/')
  } else return res.status(401).redirect('/')
}
