import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { lucia } from "@/lib/auth-edge";

export async function middleware(request: NextRequest) {
  // Paths that don't require authentication
  const publicPaths = [
    "/",
    "/sign-in",
    "/sign-up",
    "/api",
    "/catalogs",
    "/detail-product",
    "/dashboard/sign-in",
  ];

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
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Session validation is limited in middleware due to edge environment constraints
  // Only session cookie existence is verified here for performance

  // For auth pages, we still want to redirect authenticated users
  if (pathname === "/sign-in" || pathname === "/sign-up") {
    // Full session validation is handled on the server-side to ensure security
    // while maintaining middleware performance in the edge environment
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets).*)"],
};
