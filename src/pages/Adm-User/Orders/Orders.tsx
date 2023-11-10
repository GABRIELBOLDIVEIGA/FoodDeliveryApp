import { useEffect, useState } from "react";
import Header from "../Header/Header";
import { deliveryInstance } from "src/services/deliveryInstance";
import { orderAdmValidator, OrderAdm } from "src/validator/orderAdm/orderAdm";
import { OrderCardAdm } from "./OrderCardAdm/OrderCardAdm";

export const Orders = () => {
  const [orders, setOrders] = useState<Array<OrderAdm>>()

  useEffect(() => {
    deliveryInstance.get('/order')
    .then((res) => {
      const parse = orderAdmValidator.array().safeParse(res.data);
      if(parse.success) {
        setOrders(parse.data)
      } else {
        console.log(parse)
      }
    })
    .catch((err) => { console.log(err) })

  },[])


  return (
  <section>
    <Header translateKey="OrdersAdm.title" />
    
    <section className="flex flex-col gap-2 py-20 px-4 bg-background">
      {orders?.map((order) => (
        <OrderCardAdm key={order._id} {...order}/>
      ))}
    </section>
  </section>);
};
