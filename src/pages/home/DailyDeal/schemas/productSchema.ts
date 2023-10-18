import { z } from "zod";

export const productSchema = z.object({
  _id: z.string(),
  name: z.string(),
  price: z.number(),
  activePromotion: z.boolean(),
  promotionalPrice: z.number(),
  img: z.string(),
});

export type Product = z.infer<typeof productSchema>;
