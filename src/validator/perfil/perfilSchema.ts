import { z } from "zod"

export const perfilSchema = z.object({
  name: z.string().max(30, "Nome muito grande."),
  email: z.string().email("Informe um Email valido"),
  document: z.string().min(3, "Informe o documento").max(15, "Documento muito grande."),
  zipCode: z.string().min(8, "informe o CEP").max(8, "Numero do CEP muito grande."),
  neighborhood: z.string().min(3, "Informe o Bairro"),
  street: z.string().min(3, "Informe a Rua").max(30, "Nome da Rua muito grande."),
  city: z.string().min(3, "Informe a Cidade").max(30, "Nome da cidade muito grande."),
  number: z.string().min(1, "Informe o numero").max(10, "Numero da casa muito grande."),
  phoneNumber: z.string().min(8, "Informe Telefone").max(10, "Numero de telefone muito grande.")
})

export type Perfil = z.infer<typeof perfilSchema>