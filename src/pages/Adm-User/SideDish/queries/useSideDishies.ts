import { useInfiniteQuery } from "@tanstack/react-query"
import { useDeliveryInstance } from "src/services/deliveryInstance"
import { sideDishValidator } from "src/validator/sideDish/sideDishValidator"

export const useSideDishies = () => {
  const { deliveryInstance } = useDeliveryInstance()
  
  const fetchSideDish = async ({pageParam = 1}) => {
    const response = await deliveryInstance.get(`/sideDish/sideDish/query?page=${pageParam}&limit=10`)
    
    const parse = sideDishValidator.array().safeParse(response.data)
    if(parse.success) {
      return parse.data
    } else {
      console.error('[Error sideDishValidator] - ', parse)
      return []
    }
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['sideDish'],
    queryFn: fetchSideDish,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPage, page) => {

      const nextPage = lastPage.length ? page + 1 : undefined;
      return nextPage;
    }
  })

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage }
}