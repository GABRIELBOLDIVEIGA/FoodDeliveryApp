import { z } from "zod";
import { userValidator } from "../user/user";

export const orderAdmValidator = z.object({
  _id: z.string(),
  user: userValidator.or(z.null()),
  deliveryAddress: z.string(),
  
  products: z.array(
    z.object({
      productID: z.string(),
      name: z.string(),
      price: z.number(),
      amount: z.number(),
      _id: z.string(),
    })),
  total: z.number(),
});


export type OrderAdm = z.infer<typeof orderAdmValidator>;

