import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(3, "Nome deve ter no minimo 3 caracteres").max(20, "Nome deve ter no minimo 20 caracteres"),
  description: z.string().max(50, "Descrição deve ter no maximo 50 caracteres").default(''),
  img: z.string().optional()
});

export type Category = z.infer<typeof categorySchema>;
