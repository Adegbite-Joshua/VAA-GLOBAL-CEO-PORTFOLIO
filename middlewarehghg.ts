import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyAuthFromRequest } from "./lib/auth"

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define protected routes
  const isAdminRoute = path.startsWith("/admin")
  const isApiAdminRoute = path.startsWith("/api/admin")

  // Public routes that don't need authentication
  const isPublicRoute =
    path === "/auth/login" ||
    path === "/auth/signup" ||
    path.startsWith("/api/auth/login") ||
    path.startsWith("/api/auth/signup") ||
    path.startsWith("/api/seed")

  // If it's a public route, allow access
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Verify authentication for protected routes
  if (isAdminRoute || isApiAdminRoute) {
    const session = await verifyAuthFromRequest(request)

    // If not authenticated, redirect to login
    if (!session) {
      const loginUrl = new URL("/auth/login", request.url)
      loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }

    // If not an admin, redirect to home
    if (session.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url))
    }

    // If authenticated and admin, allow access
    return NextResponse.next()
  }

  // For all other routes, proceed normally
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/auth/login", "/auth/signup"],
}
