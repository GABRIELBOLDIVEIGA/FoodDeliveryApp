import { useDeliveryInstance } from "src/services/deliveryInstance"
import { profileValidator } from "src/validator/profile/profileValidator";

export const useGetAllClients = () => {
  const { deliveryInstance } = useDeliveryInstance()

  const getAllClients = async () => {
    const response = await deliveryInstance.get('/user')

    const parse = profileValidator.array().safeParse(response.data);

    if (parse.success) {
      return parse.data;
    }
  }

  return { getAllClients }
}