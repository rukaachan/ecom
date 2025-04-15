import { z } from 'zod';

export const schemaSignIn = z.object({
  email: z
    .string()
    .trim() // remove spaces
    .nonempty({ message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .trim() // remove spaces
    .nonempty({ message: 'Password is required' })
    .min(5, {
      message: 'Password must be at least 5 characters long',
    }),
});
