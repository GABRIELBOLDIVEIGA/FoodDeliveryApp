import { z } from 'zod';
import { categoryValidator } from 'src/validator/category/categoryValidator';

export const productValidator = z.object({
  _id: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  promotionalPrice: z.number(),
  category: categoryValidator,
  img: z.string(),
  avaliable: z.boolean(),
  activePromotion: z.boolean(),
});

export const productsSchema = z.array(productValidator);

export type Product = z.infer<typeof productValidator>;
