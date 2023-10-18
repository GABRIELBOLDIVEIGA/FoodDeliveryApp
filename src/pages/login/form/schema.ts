import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("insira um email valido"),
  password: z.string().min(6, "Senha muito curta"),
});

export default loginSchema;
