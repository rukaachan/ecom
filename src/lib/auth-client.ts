import type { Session, User } from "lucia";

export const getUser = async (): Promise<
  { user: User; session: Session } | { user: null; session: null }
> => {
  return {
    user: null,
    session: null,
  };
};

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
