import { useForm } from "react-hook-form"
import { Order } from "./type"
import { zodResolver } from "@hookform/resolvers/zod"
import { orderSchema } from "./schema"
import { deliveryInstance } from "src/services/deliveryInstance"

export const useOrder = () => {
  const form = useForm<Order>({ criteriaMode: 'all', mode: 'onBlur', resolver: zodResolver(orderSchema) })

  const handleSubmitOrder = (data: Order) => {
    deliveryInstance.post('/order', data)
      .then((res) => { console.log(res.data) })
      .catch((err) => { console.log(err) })
      .finally(() => { })
  }

  return { form, handleSubmitOrder }
}