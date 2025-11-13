import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Initialize prisma client instance, reusing existing one in development
const prismaClient = globalThis.prisma ?? new PrismaClient();

// In development, assign the instance to globalThis for reuse
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prismaClient;
}

export default prismaClient;
