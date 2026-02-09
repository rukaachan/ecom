// Edge-compatible version of auth utilities for middleware
import type { Role } from "@prisma/client";
import type { Session, User } from "lucia";

// Mock implementation for edge environment (middleware)
export const lucia = {
  sessionCookieName: "auth_session",
  validateSession: async (_sessionId: string) => {
    // Edge environment limitations prevent full session validation
    // Complete authentication verification is performed in server components
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

// Mock getUser for edge environment
export const getUser = async (): Promise<
  { user: User; session: Session } | { user: null; session: null }
> => {
  // On edge environment, we can't access cookies directly for validation
  // The actual authentication check happens on the server
  return {
    user: null,
    session: null,
  };
};

// Type declarations for Lucia
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    UserId: number;
    DatabaseUserAttributes: {
      id: number;
      name: string;
      email: string;
      role: Role;
    };
  }
}
