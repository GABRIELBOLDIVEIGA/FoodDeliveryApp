import { productCartSchema } from "src/context/cart/schema/cartSchema";
import { z } from "zod";

export const orderSchema = z.object({
  user: z.string(),
  deliveryAddress: z.object({
    zipCode: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    city: z.string(),
    number: z.string()
  }),
  products: z.array(productCartSchema),
  total: z.coerce.number(),
});