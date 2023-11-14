import { useDeliveryInstance } from "src/services/deliveryInstance";
import { orderAdmValidator } from "src/validator/orderAdm/orderAdm";

export const useGetAllOrders = () => {
  const { deliveryInstance } = useDeliveryInstance()

  const getAllOrders = async () => {
    const response = await deliveryInstance.get('/order')
    const parse = orderAdmValidator.array().safeParse(response.data);
    if (parse.success) return parse.data
  }

  return { getAllOrders }
}
