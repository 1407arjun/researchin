import { NextRequest, NextResponse } from 'next/server'
import { getSession } from 'next-auth/react'

export default async function middleware(req: NextRequest) {
  const session = await getSession()
  console.log(session)

  const url = req.nextUrl.clone()
  if (!session && req.nextUrl.pathname.startsWith('/app')) {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (session && req.nextUrl.pathname.startsWith('/auth')) {
    url.pathname = '/app'
    return NextResponse.redirect(url)
  }
}
