import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { lucia } from "@/lib/auth";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(lucia.sessionCookieName)?.value ?? null;

    if (sessionId) {
      await lucia.invalidateSession(sessionId);
    }

    const sessionCookie = lucia.createBlankSessionCookie();
    const response = NextResponse.redirect(
      new URL("/sign-in", process.env.NEXTAUTH_URL || "http://localhost:3000")
    );
    response.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return response;
  } catch (_error) {
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
}
