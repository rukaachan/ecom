import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import prisma from '../../lib/prisma';
import { Lucia } from 'lucia';
import { Role } from '@prisma/client';
import { cache } from 'react';
import { cookies } from 'next/headers';

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production',
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

// This function is used to get the user from the session cookie
// It is cached to avoid unnecessary database calls
export const getUser = cache(async () => {
  const sessionId =
    (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) return null;
  const { user, session } = await lucia.validateSession(sessionId);
  try {
    if (session?.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {
    // Next.js throws error when attempting to set cookies when rendering page
  }
  return user;
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    userId: number;
    DatabaseUserAttributes: {
      id: number;
      name: string;
      email: string;
      role: Role;
    };
  }
}
