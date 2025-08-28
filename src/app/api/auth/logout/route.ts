import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { lucia } from "@/lib/auth";

export async function POST() {
  try {
    // Get the session ID from the cookie
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

    if (sessionId) {
      // Invalidate the session
      await lucia.invalidateSession(sessionId);
    }

    // Create a blank session cookie to clear the existing one
    const sessionCookie = lucia.createBlankSessionCookie();

    // Create the response
    const response = new NextResponse(null, { status: 204 });

    // Set the cookie to clear the session
    response.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return response;
  } catch (error) {
    console.error("Error logging out:", error);
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
}
