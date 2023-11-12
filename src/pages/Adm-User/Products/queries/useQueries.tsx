import { deliveryInstance } from 'src/services/deliveryInstance';
import { productValidator } from 'src/validator/product/productValidator';

export const getAllProducts = async () => {
  const response = await deliveryInstance.get('/product');

  const parse = productValidator.array().safeParse(response.data);
  
  if (parse.success) return parse.data;
};
