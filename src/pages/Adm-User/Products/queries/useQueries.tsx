import { useDeliveryInstance } from 'src/services/deliveryInstance';
import { productValidator } from 'src/validator/product/productValidator';

export const useGetAllProducts = () => {
  const { deliveryInstance } = useDeliveryInstance();

  const getAllProducts = async () => {
    const response = await deliveryInstance.get('/product');

    const parse = productValidator.array().safeParse(response.data);

    if (parse.success) return parse.data;
  };

  return { getAllProducts };
};
