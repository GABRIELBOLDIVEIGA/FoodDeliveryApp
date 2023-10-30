import { z } from "zod";

export const registerUserSchema = z
  .object({
    name: z.string().min(5, "Min 5").max(25, "Max 25"),
    email: z.string().email("Insira um E-mail valido"),
    password: z.string().min(6, "Min 6").max(30, "Max 30"),
    confirmPassword: z.string().min(6, "Min 6").max(30, "Max 30"),
    phoneNumber: z.string().min(8, "Min 8").max(9, "Max 9"),
    document: z.string().min(3, "Min 3").max(15, "Max 15"),
    zipCode: z.string().min(8, "Min 8").max(9, "Max 9"),
    neighborhood: z.string().min(3, "Min 8").max(20, "Max 20"),
    street: z.string().min(3, "Min 3").max(30, "Max 30"),
    city: z.string().min(3, "Min 3").max(30, "Max 30"),
    number: z.string().min(3, "Min 3").max(10, "Max 10"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senha e Confirmar Senha devem ser iguais.",
    path: ["confirmPassword"],
  });

export type RegisterUser = z.infer<typeof registerUserSchema>;
