import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const TOKEN_KEY = 'user-token'
const PROTECTED_ROUTES = ['/home', '/dashboard', '/projects', '/tasks', '/settings', 'profile']


export async function middleware(request: NextRequest) {
  const cookie = await cookies()
  const token = cookie.get(TOKEN_KEY)?.value;

  
  const isProtectedRoute = PROTECTED_ROUTES.includes(request.nextUrl.pathname);

  if(isProtectedRoute && !token ) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

   if(token && request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register')){
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico, sitemap.xml, robots.txt (metadata files)
       */
      '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}