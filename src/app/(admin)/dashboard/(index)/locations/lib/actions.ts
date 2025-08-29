"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { schemaCategory } from "@/lib/schema";
import type { ActionResult } from "@/type";
import prisma from "../../../../../../../lib/prisma";

export async function postLocation(_: unknown, formData: FormData): Promise<ActionResult> {
  const validate = schemaCategory.safeParse({
    name: formData.get("name"),
  });

  if (!validate.success) {
    return {
      error: validate.error.errors[0].message,
    };
  }

  try {
    await prisma?.location.create({
      data: {
        name: validate.data.name,
      },
    });
    revalidatePath("/dashboard/locations");
  } catch (error) {
    return {
      error: "Failed to create location",
    };
  }

  return redirect("/dashboard/locations");
}

export async function updateLocation(
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
      error: "Location ID is not found",
    };
  }

  try {
    await prisma?.location.update({
      where: {
        id: id,
      },
      data: {
        name: validate.data.name,
      },
    });
    revalidatePath("/dashboard/locations");
  } catch (error) {
    return {
      error: "Failed to update location",
    };
  }

  return redirect("/dashboard/locations");
}

export async function deleteLocation(_: unknown, formData: FormData): Promise<ActionResult> {
  
  const id = formData.get("id");

  
  if (!id) {
    return {
      error: "Location ID is required",
    };
  }

  
  const locationId = parseInt(id.toString(), 10);

  
  if (Number.isNaN(locationId)) {
    return {
      error: "Invalid location ID",
    };
  }

  try {
    await prisma?.location.delete({
      where: {
        id: locationId,
      },
    });
    revalidatePath("/dashboard/locations");
  } catch (error) {
    return {
      error: "Failed to delete location. It might be associated with products.",
    };
  }

  return redirect("/dashboard/locations");
}
