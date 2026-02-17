"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { deleteFile, uploadFile } from "@/lib/local-storage";
import { ALLOW_MIME_TYPES } from "@/lib/schema";
import type { ActionResult } from "@/type";
import prisma from "../../../../../../../lib/prisma";

// Define the product schema
const schemaProduct = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(4, { message: "Name must be at least 4 characters long" }),
  description: z
    .string({ required_error: "Description is required" })
    .min(10, { message: "Description must be at least 10 characters long" }),
  category_id: z
    .string({ required_error: "Category is required" })
    .refine((val) => !Number.isNaN(Number(val)), {
      message: "Category must be a valid number",
    }),
  brand_id: z
    .string({ required_error: "Brand is required" })
    .refine((val) => !Number.isNaN(Number(val)), {
      message: "Brand must be a valid number",
    }),
  location_id: z
    .string({ required_error: "Location is required" })
    .refine((val) => !Number.isNaN(Number(val)), {
      message: "Location must be a valid number",
    }),
  status: z.enum(["available", "out_of_stock"], {
    required_error: "Status is required",
  }),
});

export async function postProduct(_: unknown, formData: FormData): Promise<ActionResult> {
  // Extract form data
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const category_id = formData.get("category_id") as string;
  const brand_id = formData.get("brand_id") as string;
  const location_id = formData.get("location_id") as string;
  const status = formData.get("status") as string;

  // Handle images - get all files with name "images"
  const images = formData.getAll("images") as File[];

  // Validate required fields
  const validate = schemaProduct.safeParse({
    name,
    description,
    category_id,
    brand_id,
    location_id,
    status,
  });

  if (!validate.success) {
    return {
      error: validate.error.errors[0].message,
    };
  }

  try {
    // Upload images if provided
    let imageFilenames: string[] = [];
    if (images && images.length > 0 && images[0] instanceof File && images[0].size > 0) {
      // Filter for valid image files
      const validImages = images.filter(
        (file) => file instanceof File && ALLOW_MIME_TYPES.includes(file.type)
      );

      if (validImages.length > 0) {
        // Upload each valid image
        imageFilenames = await Promise.all(
          validImages.map((image) => uploadFile(image, "product"))
        );
      }
    }

    // Create product in database
    const _result = await prisma.product.create({
      data: {
        name: validate.data.name,
        description: validate.data.description,
        category_id: Number.parseInt(validate.data.category_id, 10),
        brand_id: Number.parseInt(validate.data.brand_id, 10),
        location_id: Number.parseInt(validate.data.location_id, 10),
        stock: validate.data.status,
        images: imageFilenames,
        price: BigInt(0), // Default price, should be updated later
      },
    });

    revalidatePath("/dashboard/products");
  } catch (error) {
    return {
      error: `Failed to create product: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }

  return redirect("/dashboard/products");
}

export async function updateProduct(
  _: unknown,
  formData: FormData,
  id: number
): Promise<ActionResult> {
  // Extract form data
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const category_id = formData.get("category_id") as string;
  const brand_id = formData.get("brand_id") as string;
  const location_id = formData.get("location_id") as string;
  const status = formData.get("status") as string;

  // Handle images - get all files with name "images"
  const images = formData.getAll("images") as File[];
  const removedImages = formData.getAll("removedImages") as string[];

  try {
    // First, check if the product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return {
        error: "Product not found",
      };
    }

    // Validate required fields
    const validate = schemaProduct.safeParse({
      name,
      description,
      category_id,
      brand_id,
      location_id,
      status,
    });

    if (!validate.success) {
      return {
        error: validate.error.errors[0].message,
      };
    }

    // Handle image updates
    let imageFilenames: string[] = existingProduct.images || [];

    // Remove images that were marked for deletion
    if (removedImages && removedImages.length > 0) {
      // Delete removed images from storage
      await Promise.all(removedImages.map((image) => deleteFile(image, "product")));

      // Filter out removed images from the current list
      imageFilenames = imageFilenames.filter((image) => !removedImages.includes(image));
    }

    // If new images are provided, upload them and add to existing ones
    // Filter out invalid files first
    const validNewImages = images.filter(
      (file) => file instanceof File && file.size > 0 && ALLOW_MIME_TYPES.includes(file.type)
    );

    if (validNewImages.length > 0) {
      // Upload new images
      const newImageFilenames = await Promise.all(
        validNewImages.map((image) => uploadFile(image, "product"))
      );

      // Add new images to the existing list
      imageFilenames = [...imageFilenames, ...newImageFilenames];
    }

    // Update product in database
    const _result = await prisma.product.update({
      where: { id },
      data: {
        name: validate.data.name,
        description: validate.data.description,
        category_id: Number.parseInt(validate.data.category_id, 10),
        brand_id: Number.parseInt(validate.data.brand_id, 10),
        location_id: Number.parseInt(validate.data.location_id, 10),
        stock: validate.data.status,
        images: imageFilenames,
      },
    });

    revalidatePath("/dashboard/products");
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "P2025") {
      return {
        error: "Product not found or could not be updated",
      };
    }
    return {
      error: `Failed to update product: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }

  return redirect("/dashboard/products");
}

export async function deleteProduct(
  _state: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const id = parseInt(formData.get("id") as string, 10);

  try {
    // First, get the product to access its images
    const product = await prisma.product.findUnique({
      where: { id },
      select: {
        images: true,
      },
    });

    if (!product) {
      return {
        error: "Product not found",
      };
    }

    // Delete images from storage
    if (product.images && product.images.length > 0) {
      await Promise.all(product.images.map((image) => deleteFile(image, "product")));
    }

    // Delete product from database
    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/dashboard/products");
  } catch {
    return {
      error: "Failed to delete product",
    };
  }

  return redirect("/dashboard/products");
}
