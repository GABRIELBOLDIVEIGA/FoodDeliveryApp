import { z } from "zod";

export const userValidator = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  document: z.string(),
  zipCode: z.string(),
  neighborhood: z.string(),
  street: z.string(),
  city: z.string(),
  number: z.string(),
  role: z.enum(['user', 'adm']),
});

export type User = z.infer<typeof userValidator>