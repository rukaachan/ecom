import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import type { Role } from "@prisma/client";
import { Lucia, type Session, type User } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";
import prisma from "../../lib/prisma";

// Check if we're running on the server
const isServer = typeof window === "undefined";

// Only initialize the adapter on the server side
let adapter: any;
let luciaInstance: any;

if (isServer) {
  adapter = new PrismaAdapter(prisma.session, prisma.user);
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
  // Client-side mock
  luciaInstance = {
    sessionCookieName: "auth_session",
    validateSession: async () => {
      return {
        user: null,
        session: null,
      };
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
    // Return null user/session if we're on the client
    if (!isServer) {
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
        console.error("Error setting cookies:", error);
      }
      return result;
    } catch (error) {
      console.error("Error in getUser:", error);
      return {
        user: null,
        session: null,
      };
    }
  }
);

// Only declare the module on the server
if (isServer) {
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
}
