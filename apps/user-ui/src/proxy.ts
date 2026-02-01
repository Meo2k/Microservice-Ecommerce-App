import { NextResponse, NextRequest } from 'next/server'
import { authRoutes } from '@/configs/route.config'
 
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname
    if (authRoutes.includes(path)) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
}
 
export const config = {
  matcher: '/:path*',
}