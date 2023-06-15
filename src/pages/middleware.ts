import { NextRequest, NextResponse } from 'next/server'
import { getSession } from 'next-auth/react'

export default async function middleware(req: NextRequest) {
  const session = await getSession()

  if (!session && req.nextUrl.pathname.startsWith('/app'))
    return NextResponse.redirect('/login')

  if (session && ['/', '/login'].includes(req.nextUrl.pathname))
    return NextResponse.redirect('/app')
}
