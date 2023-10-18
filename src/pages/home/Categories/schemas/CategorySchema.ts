import { z } from "zod";

export const CategoriesSchema = z.array(
  z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    img: z.string(),
  }),
);

export type Categories = z.infer<typeof CategoriesSchema>;

export type Category = Categories[0];
