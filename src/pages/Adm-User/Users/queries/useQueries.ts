import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDeliveryInstance } from "src/services/deliveryInstance"
import { profileValidator } from "src/validator/profile/profileValidator";

export const useUsers = () => {
  const { deliveryInstance } = useDeliveryInstance();
  const [filter, setFilter] = useState('')

  interface fetchUsersDishProps {
    pageParam: number,
    queryKey: string[]
  }
  const fetchUsers = async ({ pageParam = 1, queryKey = [] }: fetchUsersDishProps) => {
    const filter = queryKey[1].length >= 2 ? queryKey[1] : '';

    const response = await deliveryInstance.get(`/user?page=${pageParam}&limit=10&filter=${filter}`)

    const parse = profileValidator.array().safeParse(response.data);

    if (parse.success) {
      return parse.data;
    } else {
      console.error("[Error Profile] - ", parse)
      return []
    }
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess, isFetching } = useInfiniteQuery({
    queryKey: ['users', filter],
    queryFn: fetchUsers,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPage, page) => {
      const nextPage = lastPage.length === 10 ? page + 1 : undefined;
      return nextPage;
    }
  })

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess, isFetching, filter, setFilter }
}