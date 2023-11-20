import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDeliveryInstance } from 'src/services/deliveryInstance';
import { productValidator } from 'src/validator/product/productValidator';

export const useProducts = () => {
  const { deliveryInstance } = useDeliveryInstance();
  const [filter, setFilter] = useState('');

  interface FetchProductsProps {
    pageParam: number;
    queryKey: string[];
  } 
  const fetchProducts = async ({ pageParam = 1, queryKey }: FetchProductsProps) => {
    const filter = queryKey[1].length >= 2 ? queryKey[1] : '';

    const response = await deliveryInstance.get(`/product?page=${pageParam}&limit=10&filter=${filter}`);

    const parse = productValidator.array().safeParse(response.data);

    if (parse.success) {
      return parse.data;
    } else {
      console.error("[Error Products] - ", parse)
      return []
    }
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess, isFetching } = useInfiniteQuery({
    queryKey: ['product', filter],
    queryFn: fetchProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPage, page) => {
      const nextPage = lastPage.length === 10 ? page + 1 : undefined;
      return nextPage;
    }
  })

  return { filter, setFilter, data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess, isFetching};
}