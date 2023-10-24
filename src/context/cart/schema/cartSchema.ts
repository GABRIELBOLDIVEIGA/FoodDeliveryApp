import { z } from "zod";

export const productCartSchema = z.object({
  productID: z.string(),
  name: z.string(),
  price: z.coerce.number(),
  amount: z.coerce.number(),
});
export type ProductCart = z.infer<typeof productCartSchema>;
