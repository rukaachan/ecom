"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { schemaCategory } from "@/lib/schema";
import type { ActionResult } from "@/type";
import prisma from "../../../../../../../lib/prisma";

export async function postCategory(_: unknown, formData: FormData): Promise<ActionResult> {
  const validate = schemaCategory.safeParse({
    name: formData.get("name"),
  });

  if (!validate.success) {
    return {
      error: validate.error.errors[0].message,
    };
  }

  try {
    await prisma?.category.create({
      data: {
        name: validate.data.name,
      },
    });
    revalidatePath("/dashboard/categories");
  } catch (_error) {
    return {
      error: "Failed to create category",
    };
  }

  return redirect("/dashboard/categories");
}

export async function updateCategory(
  _: unknown,
  formData: FormData,
  id: number | undefined
): Promise<ActionResult> {
  const validate = schemaCategory.safeParse({
    name: formData.get("name"),
  });

  if (!validate.success) {
    return {
      error: validate.error.errors[0].message,
    };
  }

  if (id === undefined) {
    return {
      error: "Category ID not found",
    };
  }

  try {
    await prisma?.category.update({
      where: {
        id: id,
      },
      data: {
        name: validate.data.name,
      },
    });
    revalidatePath("/dashboard/categories");
  } catch (_error) {
    return {
      error: "Failed to update category",
    };
  }

  return redirect("/dashboard/categories");
}

export async function deleteCategory(
  _state: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const id = formData.get("id");

  if (!id) {
    return {
      error: "Category ID is required",
    };
  }

  const categoryId = parseInt(id.toString(), 10);

  if (Number.isNaN(categoryId)) {
    return {
      error: "Invalid category ID",
    };
  }

  try {
    await prisma?.category.delete({
      where: {
        id: categoryId,
      },
    });
    revalidatePath("/dashboard/categories");
  } catch (_error) {
    return {
      error: "Failed to delete category. It might be associated with products.",
    };
  }

  return redirect("/dashboard/categories");
}
