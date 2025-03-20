import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/lib/auth"

// This middleware protects routes that require authentication
export async function middleware(request: NextRequest) {
  const session = await auth()

  // Protected routes
  const protectedPaths = ["/history", "/account"]
  const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  // Redirect to login if accessing protected route without authentication
  if (isProtectedPath && !session) {
    const url = new URL("/auth/login", request.url)
    url.searchParams.set("callbackUrl", request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // Add rate limiting headers for API routes
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const response = NextResponse.next()
    response.headers.set("X-RateLimit-Limit", "100")
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/history/:path*", "/account/:path*", "/api/:path*"],
}

