import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import type { Role } from "@prisma/client";
import { Lucia, type Session, type User } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";

// Always try to initialize the real Lucia instance
let luciaInstance: any;

try {
  // Check if we're in an environment where we can use Prisma
  const isEdge = typeof process === "undefined" || process.env?.NEXT_RUNTIME === "edge";

  if (!isEdge) {
    // Dynamically import prisma only in server environment
    const { default: prisma } = await import("../../lib/prisma");

    const adapter = new PrismaAdapter(prisma.session, prisma.user);

    luciaInstance = new Lucia(adapter, {
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
    });
  } else {
    throw new Error("Edge environment - using mock");
  }
} catch (error) {
  // Fallback mock for edge environments or errors
  luciaInstance = {
    sessionCookieName: "auth_session",
    validateSession: async () => {
      return {
        user: null,
        session: null,
      };
    },
    createSession: async () => {
      throw new Error("createSession not available in this environment");
    },
    createSessionCookie: () => {
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
  };
}

export const lucia = luciaInstance;

export const getUser = cache(
  async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
    // Check if we're in an edge environment
    const isEdge = typeof process === "undefined" || process.env?.NEXT_RUNTIME === "edge";

    // Return null user/session if we're in edge environment
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

      // next.js throws when you attempt to set cookie when rendering page
      try {
        if (result.session?.fresh) {
          const sessionCookie = lucia.createSessionCookie(result.session.id);
          (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
        if (!result.session) {
          const sessionCookie = lucia.createBlankSessionCookie();
          (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
      } catch (error) {
        // Silently fail cookie setting errors
      }

      return result;
    } catch (error) {
      return {
        user: null,
        session: null,
      };
    }
  }
);

// Type declarations for Lucia
declare module "lucia" {
  interface Register {
    Lucia: typeof luciaInstance;
    UserId: number;
    DatabaseUserAttributes: {
      id: number;
      name: string;
      email: string;
      role: Role;
    };
  }
}