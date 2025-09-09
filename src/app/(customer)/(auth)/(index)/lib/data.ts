"use server";

import { getImageUrl } from "@/lib/local-storage";

export async function getCategories() {
  try {
    const categories = await prisma?.category.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    return categories || [];
  } catch (_error) {
    console.log(_error);
    return [];
  }
}

export async function getProducts() {
  try {
    const products = await prisma?.product.findMany({
      select: {
        images: true,
        id: true,
        name: true,
        category: {
          select: {
            name: true,
          },
        },
        price: true,
      },
    });

    const response = products?.map((item) => {
      return {
        ...item,
        image_url: getImageUrl(item.images[0], "product"),
      };
    });

    return response;
  } catch (_error) {
    console.log(_error);
    return [];
  }
}

export async function getBrands() {
  try {
    const brands = await prisma?.brand.findMany({
      select: {
        id: true,
        logo: true,
      },
    });

    const response = brands?.map((item) => {
      return {
        ...item,
        logo_url: getImageUrl(item.logo, "brands"),
      };
    });

    return response || [];
  } catch (_error) {
    console.log(_error);
    return [];
  }
}
