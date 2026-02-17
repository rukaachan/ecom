import type { Session, User } from "lucia";

export const lucia = {
  sessionCookieName: "auth_session",
  validateSession: async (_sessionId: string) => {
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

export const getUser = async (): Promise<
  { user: User; session: Session } | { user: null; session: null }
> => {
  return {
    user: null,
    session: null,
  };
};
