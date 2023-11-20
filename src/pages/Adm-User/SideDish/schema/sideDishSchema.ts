import { z } from "zod";

export const sideDishSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.coerce.number(),
  avaliable: z.boolean()
})

