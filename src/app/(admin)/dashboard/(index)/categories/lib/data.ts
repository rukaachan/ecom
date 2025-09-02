"use server";

import prisma from "../../../../../../../lib/prisma";

export async function getCategories() {
  try {
    const categories = (await prisma?.category.findMany({})) || [];
    return categories;
  } catch (_error) {
    return [];
  }
}

export async function getCategoryById(id: string) {
  try {
    const category = await prisma.category.findFirst({
      where: {
        id: Number.parseInt(id, 10),
      },
    });

    return category;
  } catch (_error) {
    return null;
  }
}
