import type { Role } from "@prisma/client";

declare module "lucia" {
  interface Register {
    UserId: number;
    DatabaseUserAttributes: {
      id: number;
      name: string;
      email: string;
      role: Role;
    };
  }
}

