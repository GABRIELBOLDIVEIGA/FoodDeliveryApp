import { z } from 'zod';

export const profileValidator = z.object({
  _id: z.string(),
  name: z.string().max(30, 'Nome muito grande.'),
  email: z.string().email('Informe um Email valido'),
  document: z
    .string()
    .min(3, 'Informe o documento')
    .max(15, 'Documento muito grande.'),
  zipCode: z
    .string()
    .min(3, 'informe o CEP')
    .max(13, 'Numero do CEP muito grande.'),
  neighborhood: z.string().min(3, 'Informe o Bairro'),
  street: z
    .string()
    .min(3, 'Informe a Rua')
    .max(30, 'Nome da Rua muito grande.'),
  city: z
    .string()
    .min(3, 'Informe a Cidade')
    .max(30, 'Nome da cidade muito grande.'),
  number: z
    .string()
    .min(1, 'Informe o numero')
    .max(10, 'Numero da casa muito grande.'),
  phoneNumber: z
    .string()
    .min(2, 'Informe Telefone')
    .max(20, 'Numero de telefone muito grande.'),
});

export type Profile = z.infer<typeof profileValidator>;
