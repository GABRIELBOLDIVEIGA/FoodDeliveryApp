import { useInfiniteQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useDeliveryInstance } from "src/services/deliveryInstance"
import { sideDishValidator } from "src/validator/sideDish/sideDishValidator"

export const useSideDishies = () => {
  const { deliveryInstance } = useDeliveryInstance()
  const [filter, setFilter] = useState('')

  interface fetchSideDishProps {
    pageParam: number,
    queryKey: string[]
  }
  const fetchSideDish = async ({pageParam = 1, queryKey = []}: fetchSideDishProps) => {
    const filter = queryKey[1].length >= 2 ? queryKey[1] : '';

    const response = await deliveryInstance.get(`/sideDish?page=${pageParam}&limit=10&filter=${filter}`)

    const parse = sideDishValidator.array().safeParse(response.data)
    if (parse.success) {
      return parse.data
    } else {
      console.error('[Error sideDishValidator] - ', parse)
      return []
    }
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess, isFetching } = useInfiniteQuery({
    queryKey: ['sideDish', filter],
    queryFn: fetchSideDish,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPage, page) => {
      const nextPage = lastPage.length === 10 ? page + 1 : undefined;
      return nextPage;
    }
  })

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess, filter, setFilter, isFetching }
}