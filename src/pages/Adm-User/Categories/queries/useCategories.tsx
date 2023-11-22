import { useQuery } from '@tanstack/react-query';
import { useDeliveryInstance } from 'src/services/deliveryInstance';
import { categoryValidator } from 'src/validator/category/categoryValidator';

export const useCategories = () => {
  const { deliveryInstance } = useDeliveryInstance();
  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchCategories(),
  });

  const fetchCategories = async () => {
    const response = await deliveryInstance.get('/category');

    const parse = categoryValidator.array().safeParse(response.data);

    if (parse.success) {
      return parse.data;
    } else {
      console.error('[Error Categories] - ', parse);
      return [];
    }
  };

  return { data, isLoading };
};
