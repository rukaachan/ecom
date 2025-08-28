"use server";

import bcryptjs from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { lucia } from "@/lib/auth";
import { schemaSignIn } from "@/lib/schema";
import type { ActionResult } from "@/type";
import prisma from "../../../../../../../lib/prisma";

async function SignIn(_: unknown, formData: FormData): Promise<ActionResult> {
  // Implement schema validation here
  const validate = schemaSignIn.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validate.success) {
    return {
      error: validate.error.errors[0].message,
    };
  }

  const exisitingUser = await prisma.user.findFirst({
    where: {
      email: validate.data.email,
      role: "superadmin",
    },
  });

  if (!exisitingUser) {
    return {
      error: "Email not found",
    };
  }

  const comparedPassword = bcryptjs.compareSync(validate.data.password, exisitingUser.password);

  if (!comparedPassword) {
    return {
      error: "Invalid password",
    };
  }

  const session = await lucia.createSession(exisitingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return redirect("/dashboard");
}

export default SignIn;
