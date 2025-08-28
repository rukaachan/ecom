import { z } from "zod";

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
    .min(4, { message: "Name should have min 4 characters" }),
});
