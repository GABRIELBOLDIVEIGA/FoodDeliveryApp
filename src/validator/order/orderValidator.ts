import { z } from 'zod';

export const orderValidator = z.object({
  _id: z.string(),
  products: z.array(
    z.object({
      productID: z.string(),
      name: z.string(),
      price: z.number(),
      amount: z.number(),
    })
  ),
  total: z.number(),
});

export type Order = z.infer<typeof orderValidator>;
