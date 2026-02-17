"use server";

import bcryptjs from "bcryptjs";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { schemaSignIn, schemaSignUp } from "@/lib/schema";
import type { ActionResult } from "@/type";
import prisma from "../../../../../lib/prisma";

type CookieOptions = Parameters<(Awaited<ReturnType<typeof cookies>>)["set"]>[2];

export async function signin(_: unknown, formData: FormData): Promise<ActionResult> {
  const isServer = typeof window === "undefined";
  const isEdge = typeof process === "undefined" || process.env?.NEXT_RUNTIME === "edge";

  if (!isServer || isEdge) {
    return {
      error: "Authentication not available in this environment",
    };
  }

  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const validate = schemaSignIn.safeParse({
      email,
      password,
    });

    if (!validate.success) {
      return {
        error: validate.error.errors[0].message,
      };
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        email: validate.data.email,
        role: "customer",
      },
    });

    if (!existingUser) {
      return {
        error: "Email not found",
      };
    }

    const comparedPassword = bcryptjs.compareSync(validate.data.password, existingUser.password);

    if (!comparedPassword) {
      return {
        error: "Invalid password",
      };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes as CookieOptions
    );

    return {
      error: "",
      success: true,
    };
  } catch {
    return {
      error: "An unexpected error occurred during sign-in",
    };
  }
}

export async function signup(_: unknown, formData: FormData): Promise<ActionResult> {
  const parse = schemaSignUp.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parse.success) {
    return {
      error: parse.error.errors[0].message,
    };
  }

  const hashPassword = bcryptjs.hashSync(parse.data.password, 12);

  try {
    await prisma.user.create({
      data: {
        email: parse.data.email,
        name: parse.data.name,
        password: hashPassword,
        role: "customer",
      },
    });

    return {
      error: "",
      success: true,
    };
  } catch {
    return {
      error: "An unexpected error occurred during sign-up",
    };
  }
}
