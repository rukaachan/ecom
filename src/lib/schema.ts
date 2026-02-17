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

export const schemaShippingAddress = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(5, { message: "Name must be at least 5 characters long" }),
  address: z
    .string({ required_error: "Address is required" })
    .min(5, { message: "Address must be at least 5 characters long" }),
  city: z
    .string({ required_error: "City is required" })
    .min(2, { message: "City must be at least 2 characters long" }),
  postal_code: z
    .string({ required_error: "Postal Code is required" })
    .min(5, { message: "Postal Code must be at least 5 characters long" }),
  notes: z.string().nullable(),
  phone: z
    .string({ required_error: "Phone Number is required" })
    .min(10, { message: "Phone Number must be at least 10 characters long" }),
});
