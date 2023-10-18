import { z } from "zod";

export const categorySchema = z.object(
  {
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    img: z.string(),
  }
);

export const categoriesSchema = z.array(categorySchema);

export type Category = z.infer<typeof categorySchema>;
