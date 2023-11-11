import { deliveryInstance } from "src/services/deliveryInstance"
import { profileValidator } from "src/validator/perfil/perfilValidator";

export const getAllClients = async () => {
  const response = await deliveryInstance.get('/user')

  const parse = profileValidator.array().safeParse(response.data);

  if (parse.success) {
    return parse.data;
  }
}