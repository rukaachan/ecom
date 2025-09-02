import prisma from "../../../../../../../lib/prisma";
import type { TColumn } from "../columns";

export async function getProducts() {
  try {
    const products = await prisma?.product.findMany({
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        brand_id: true,
        category_id: true,
        location_id: true,
        images: true,
        createdAt: true,
        category: {
          select: {
            name: true,
          },
        },
        brand: {
          select: {
            name: true,
          },
        },
        location: {
          select: {
            name: true,
          },
        },
        orderProducts: {
          select: {
            id: true,
          },
        },
      },
    });

    const response_products: TColumn[] = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        images: product.images,
        category_name: product.category.name,
        brand_name: product.brand.name,
        price: Number(product.price),
        total_sales: product.orderProducts.length, // Count the number of order products
        stock: product.stock,
        createdAt: product.createdAt,
      };
    });

    return response_products;
  } catch (_error) {
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: Number.parseInt(id, 10),
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        brand_id: true,
        category_id: true,
        location_id: true,
        images: true,
        createdAt: true,
        category: {
          select: {
            name: true,
          },
        },
        brand: {
          select: {
            name: true,
          },
        },
        location: {
          select: {
            name: true,
          },
        },
      },
    });

    return product;
  } catch (_error) {
    return null;
  }
}
