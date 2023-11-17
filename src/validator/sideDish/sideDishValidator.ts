import { z } from "zod";

export const sideDishValidator = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  avaliable: z.boolean(),
});


export type SideDish = z.infer<typeof sideDishValidator>;