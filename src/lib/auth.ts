import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia, type Session, type User } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";

type CookieOptions = Parameters<(Awaited<ReturnType<typeof cookies>>)["set"]>[2];

export type AppUser = User & {
  id: number;
  name: string;
  email: string;
  role: string;
};

type ValidateSessionResult = {
  user: AppUser | null;
  session: Session | null;
};

type SessionCookie = {
  name: string;
  value: string;
  attributes: unknown;
};

type LuciaLike = {
  sessionCookieName: string;
  validateSession: (sessionId: string) => Promise<ValidateSessionResult>;
  createSession: (userId: number, attributes: Record<string, unknown>) => Promise<Session>;
  createSessionCookie: (sessionId: string) => SessionCookie;
  createBlankSessionCookie: () => SessionCookie;
  invalidateSession: (sessionId: string) => Promise<void>;
};

let lucia: LuciaLike;

try {
  const isEdge = typeof process === "undefined" || process.env?.NEXT_RUNTIME === "edge";

  if (!isEdge) {
    const { default: prisma } = await import("../../lib/prisma");

    const adapter = new PrismaAdapter(prisma.session, prisma.user);

    lucia = new Lucia(adapter, {
      sessionCookie: {
        expires: false,
        attributes: {
          secure: process.env.NODE_ENV === "production",
        },
      },
      getUserAttributes: (attributes) => {
        return {
          id: attributes.id,
          name: attributes.name,
          email: attributes.email,
          role: attributes.role,
        };
      },
    }) as unknown as LuciaLike;
  } else {
    throw new Error("Edge environment - using mock");
  }
} catch (error) {
  lucia = {
    sessionCookieName: "auth_session",
    validateSession: async () => {
      return {
        user: null,
        session: null,
      };
    },
    createSession: async () => {
      throw new Error("createSession not available in this environment", { cause: error });
    },
    createSessionCookie: (_sessionId: string) => {
      return {
        name: "auth_session",
        value: "",
        attributes: {},
      };
    },
    createBlankSessionCookie: () => {
      return {
        name: "auth_session",
        value: "",
        attributes: {},
      };
    },
    invalidateSession: async () => {
    },
  };
}

export { lucia };

export const getUser = cache(
  async (): Promise<{ user: AppUser; session: Session } | { user: null; session: null }> => {
    const isEdge = typeof process === "undefined" || process.env?.NEXT_RUNTIME === "edge";

    if (isEdge) {
      return {
        user: null,
        session: null,
      };
    }

    try {
      const cookieStore = await cookies();
      const sessionId = cookieStore.get(lucia.sessionCookieName)?.value ?? null;

      if (!sessionId) {
        return {
          user: null,
          session: null,
        };
      }

      const result = await lucia.validateSession(sessionId);

      try {
        if (result.session?.fresh) {
          const sessionCookie = lucia.createSessionCookie(result.session.id);
          (await cookies()).set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes as CookieOptions
          );
        }
        if (!result.session) {
          const sessionCookie = lucia.createBlankSessionCookie();
          (await cookies()).set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes as CookieOptions
          );
        }
      } catch {
      }

      if (result.user && result.session) {
        return { user: result.user, session: result.session };
      } else {
        return { user: null, session: null };
      }
    } catch {
      return {
        user: null,
        session: null,
      };
    }
  }
);
