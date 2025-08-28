import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { lucia } from "@/lib/auth-client";

export async function middleware(request: NextRequest) {
  // Paths that don't require authentication
  const publicPaths = ["/", "/dashboard/sign-in", "/dashboard/sign-up", "/api"];

  const { pathname } = request.nextUrl;

  // Check if the path is public
  const isPublicPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  // For API routes, we don't handle authentication here
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Get the session cookie
  const sessionId = request.cookies.get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) {
    // No session and trying to access protected route
    if (!isPublicPath) {
      return NextResponse.redirect(new URL("/dashboard/sign-in", request.url));
    }
    return NextResponse.next();
  }

  // Validate session
  const { session, user } = await lucia.validateSession(sessionId);

  if (!session) {
    // Invalid session
    const response = NextResponse.redirect(new URL("/dashboard/sign-in", request.url));
    response.cookies.delete(lucia.sessionCookieName);
    return response;
  }

  // Valid session
  if (isPublicPath && user && user.role === "superadmin") {
    // Redirect authenticated users away from auth pages
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
