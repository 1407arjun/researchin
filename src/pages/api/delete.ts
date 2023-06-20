import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'
import { NextApiRequest, NextApiResponse } from 'next'

import Account from '@/models/Account'
import Session from '@/models/Session'
import User from '@/models/User'
import clientPromise from '@/lib/mongodb'
import Preference from '@/models/Preference'

export default async function deleteUserAndAccount(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)
  const authorization = req.headers['x-client-authorization']

  if (session && authorization && session.user.id === authorization) {
    if (req.method === 'DELETE') {
      await clientPromise
      const acks = await Promise.all([
        Preference.deleteOne({ userId: session.user.id }),
        Account.deleteMany({ userId: session.user.id }),
        Session.deleteMany({ userId: session.user.id }),
        User.deleteOne({ _id: session.user.id })
      ])
      res.send(acks)
    } else return res.status(405).end()
  } else return res.status(401).end()
}
