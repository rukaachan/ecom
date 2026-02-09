"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { lucia } from "@/lib/auth";

export async function logout() {
  // Check if we're in the right environment
  const isServer = typeof window === "undefined";
  const isEdge = typeof process === "undefined" || process.env?.NEXT_RUNTIME === "edge";

  if (!isServer || isEdge) {
    return {
      error: "Logout not available in this environment",
    };
  }

  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(lucia.sessionCookieName)?.value ?? null;

    if (sessionId) {
      await lucia.invalidateSession(sessionId);

      const blankSessionCookie = lucia.createBlankSessionCookie();
      (await cookies()).set(
        blankSessionCookie.name,
        blankSessionCookie.value,
        blankSessionCookie.attributes
      );
    }

    return redirect("/dashboard/sign-in");
  } catch (_error) {
    return {
      error: "An unexpected error occurred during logout",
    };
  }
}
