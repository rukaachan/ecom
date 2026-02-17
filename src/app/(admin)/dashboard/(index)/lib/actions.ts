"use server";

import { cookies } from "next/headers";
import { getUser, lucia } from "@/lib/auth";
import type { ActionResult } from "@/type";

type CookieOptions = Parameters<(Awaited<ReturnType<typeof cookies>>)["set"]>[2];

export async function Logout(
  _: unknown,
  _formData: FormData
): Promise<ActionResult & { success?: boolean }> {
  const { session } = await getUser();
  if (!session) {
    return {
      error: "Unauthorized",
      success: false,
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes as CookieOptions
  );

  return {
    success: true,
    error: "",
  };
}
