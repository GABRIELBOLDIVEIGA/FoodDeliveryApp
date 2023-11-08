import { z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  price: z.coerce.number().min(0, "Preço não pode ser negativo."),
  description: z.string().default(''),
  promotionalPrice: z.coerce.number().min(0, "Preço não pode ser negativo.").default(0),
  category: z.string(),
  sideDish: z.array(z.string()).default([]),
  avaliable: z.boolean().default(false),
  activePromotion: z.boolean().default(false)
})

export type Product = z.infer<typeof productSchema>