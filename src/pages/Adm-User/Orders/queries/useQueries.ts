import { deliveryInstance } from "src/services/deliveryInstance"
import { orderAdmValidator } from "src/validator/orderAdm/orderAdm";

export const getAllOrders = async () => {
  const response = await deliveryInstance.get('/order')

  const parse = orderAdmValidator.array().safeParse(response.data);

  if (parse.success) return parse.data
}