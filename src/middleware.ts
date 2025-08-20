// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { clearTokenCookie, getTokenCookie } from './lib/cookies'

const publicRoutes = ['/', '/signin', '/signup']

const protectedRoutes = [
  '/consultants',
  '/dashboard',
  '/jinx',
  '/journal',
  '/learnhub',
  '/settings',
  '/simlulator',
  '/toolhub',
  '/video-fullscreen',
  '/xpods',
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const querParameter = request.nextUrl.searchParams;

  const token = await getTokenCookie(request)

  const isProtected = protectedRoutes.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  )

  const isPublic = publicRoutes.includes(pathname)

  // 1. Special case: trying to access /dashboard without login → go to /signin
  if (pathname === '/dashboard' && !token) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }


  if (pathname === '/signin') {
    let res = NextResponse.next();

    if (token === "false") {
      clearTokenCookie(res);

      const cleanUrl = new URL(request.url);
      cleanUrl.searchParams.delete("token");

      res = NextResponse.rewrite(cleanUrl); // ← changes the URL shown to /signin
    }

    return res;

  }

  // 2. Accessing any other protected route without login → go to landing
  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // 3. If logged in and trying to access public routes → redirect to /dashboard
  if (isPublic && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // 4. Allow everything else
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/signin',
    '/signup',
    '/forgot-password',
    '/consultants',
    '/consultants/:path*',
    '/dashboard',
    '/jinx',
    '/journal',
    '/learnhub',
    '/settings',
    '/simlulator',
    '/toolhub',
    '/video-fullscreen',
    '/xpods',
  ],
}
