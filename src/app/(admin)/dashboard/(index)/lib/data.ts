import prisma from "../../../../../../lib/prisma";

export async function getDashboardStats() {
  try {
    const [productsCount, categoriesCount, brandsCount, locationsCount] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.brand.count(),
      prisma.location.count(),
    ]);

    return {
      productsCount,
      categoriesCount,
      brandsCount,
      locationsCount,
    };
  } catch {
    return {
      productsCount: 0,
      categoriesCount: 0,
      brandsCount: 0,
      locationsCount: 0,
    };
  }
}
