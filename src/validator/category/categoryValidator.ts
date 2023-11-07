import { z } from 'zod';

export const categoryValidator = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  img: z.string(),
});

export const categoriesSchema = z.array(categoryValidator);

export type Category = z.infer<typeof categoryValidator>;
