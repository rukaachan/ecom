import { z } from "zod";

export const ALLOW_MIME_TYPES = ["image/jpg", "image/jpeg", "image/png"];

export const schemaSignIn = z.object({
  email: z
    .string()
    .trim() // remove spaces
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .trim() // remove spaces
    .nonempty({ message: "Password is required" })
    .min(5, {
      message: "Password must be at least 5 characters long",
    }),
});

export const schemaCategory = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(4, { message: "Name must be at least 4 characters long" }),
});

export const schemaSignUp = schemaSignIn.extend({
  name: z
    .string({ required_error: "Name is required" })
    .min(4, { message: "Name must be at least 4 characters long" }),
});

export const schemaBrands = schemaCategory.extend({
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "Image is required" })
    .refine((file) => ALLOW_MIME_TYPES.includes(file.type), {
      message: "File is not valid. Only JPG, JPEG, and PNG files are allowed",
    }),
});
