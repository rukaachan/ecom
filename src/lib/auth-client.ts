// Client-safe version of auth utilities
import type { Session, User } from "lucia";

// Mock implementation for client-side
export const getUser = async (): Promise<
  { user: User; session: Session } | { user: null; session: null }
> => {
  // On client-side, we can't access cookies directly for security reasons
  // The actual authentication check happens on the server
  return {
    user: null,
    session: null,
  };
};

// Mock session cookie name for client-side usage
export const lucia = {
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
