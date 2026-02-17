"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteFile, uploadFile } from "@/lib/local-storage";
import { schemaBrands } from "@/lib/schema";
import type { ActionResult } from "@/type";
import prisma from "../../../../../../../lib/prisma";

export async function postBrand(_: unknown, formData: FormData): Promise<ActionResult> {
  const name = formData.get("name") as string;
  const image = formData.get("image") as File;

  // Handle case where no image is uploaded
  if (!image || !(image instanceof File) || image.size === 0) {
    return {
      error: "Image is required",
    };
  }

  const validate = schemaBrands.safeParse({
    name,
    image,
  });

  if (!validate.success) {
    return {
      error: validate.error.errors[0].message,
    };
  }

  try {
    const filename = await uploadFile(validate.data.image, "brands");

    const _result = await prisma.brand.create({
      data: {
        name: validate.data.name,
        logo: filename,
      },
    });
    revalidatePath("/dashboard/brands");
  } catch {
    return {
      error: "Failed to create brand",
    };
  }

  return redirect("/dashboard/brands");
}

export async function getBrandById(id: string) {
  try {
    const brand = await prisma.brand.findFirst({
      where: {
        id: Number.parseInt(id, 10),
      },
    });

    return brand;
  } catch {
    return null;
  }
}

export async function updateBrandWithId(
  _: unknown,
  formData: FormData,
  id: number
): Promise<ActionResult> {
  const name = formData.get("name") as string;
  const image = formData.get("image") as File;

  try {
    // First, check if the brand exists
    const existingBrand = await prisma.brand.findUnique({
      where: { id },
    });

    if (!existingBrand) {
      return {
        error: "Brand not found",
      };
    }

    const dataToUpdate: { name: string; logo?: string } = { name };

    // Only update image if a new one is provided
    if (image && image instanceof File && image.size > 0) {
      const validate = schemaBrands.safeParse({ name, image });

      if (!validate.success) {
        return {
          error: validate.error.errors[0].message,
        };
      }

      const filename = await uploadFile(image, "brands");
      dataToUpdate.logo = filename;
    }

    const _result = await prisma.brand.update({
      where: { id },
      data: dataToUpdate,
    });
    revalidatePath("/dashboard/brands");
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "P2025") {
      return {
        error: "Brand not found or could not be updated",
      };
    }
    // Handle upload errors specifically
    if (error instanceof Error && error.message.includes("Upload failed")) {
      return {
        error: error.message,
      };
    }
    // Handle network connectivity issues
    if (
      error instanceof Error &&
      (error.message.includes("fetch failed") || error.message.includes("ENETUNREACH"))
    ) {
      return {
        error:
          "Network connectivity issue: Unable to access storage. Please check your internet connection and try again.",
      };
    }
    return {
      error: `Failed to update brand: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }

  return redirect("/dashboard/brands");
}

export async function deleteBrand(_state: ActionResult, formData: FormData): Promise<ActionResult> {
  const id = parseInt(formData.get("id") as string, 10);

  const brand = await prisma.brand.findFirst({
    where: {
      id: id,
    },
    select: {
      logo: true,
    },
  });

  if (!brand) {
    return {
      error: "Brand not found",
    };
  }

  try {
    await deleteFile(brand.logo, "brands");
    await prisma.brand.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/dashboard/brands");
  } catch {
    return {
      error: "Failed to delete data",
    };
  }

  return redirect("/dashboard/brands");
}
