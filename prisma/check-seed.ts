import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const [users, brands, categories, locations, products, orders] = await Promise.all([
    prisma.user.count(),
    prisma.brand.count(),
    prisma.category.count(),
    prisma.location.count(),
    prisma.product.count(),
    prisma.order.count(),
  ]);

  console.log({ users, brands, categories, locations, products, orders });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
