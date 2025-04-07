import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const TOKEN_KEY = 'user-idToken'
const PROTECTED_ROUTES = ['/home', '/dashboard', '/projects', '/tasks', '/settings', 'profile']


export async function middleware(request: NextRequest) {
  const cookie = await cookies()
  const token = cookie.get(TOKEN_KEY);
  const isProtectedRoute = PROTECTED_ROUTES.includes(request.nextUrl.pathname);

  return NextResponse.next()
}

export const config = {
    matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}