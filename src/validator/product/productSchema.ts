import { z } from 'zod';
import { categorySchema } from 'src/validator/category/categorySchema';

export const productSchema = z.object({
  _id: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  promotionalPrice: z.number(),
  category: categorySchema,
  img: z.string(),
  avaliable: z.boolean(),
  activePromotion: z.boolean(),
});

export const productsSchema = z.array(productSchema);

export type Product = z.infer<typeof productSchema>;
