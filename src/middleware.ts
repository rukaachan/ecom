import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { lucia } from "@/lib/auth-edge";

export async function middleware(request: NextRequest) {
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

  const isPublicPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const sessionId = request.cookies.get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) {
    if (!isPublicPath) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets).*)"],
};
