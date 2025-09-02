"use server";

import prisma from "../../../../../../../lib/prisma";

export async function getBrands() {
  try {
    const brands = await prisma?.brand.findMany({});
    return brands;
  } catch (_error) {
    return [];
  }
}

export async function getBrandById(id: string) {
  try {
    const brand = await prisma.brand.findFirst({
      where: {
        id: Number.parseInt(id, 10),
      },
    });

    return brand;
  } catch (_error) {
    return null;
  }
}
