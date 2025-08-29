// Edge-compatible version of Prisma client
// implementation for edge environments where Prisma client is not available

export default {
  user: {
    findFirst: async () => null,
  },
  session: {
    // Mock session methods
  },
};
