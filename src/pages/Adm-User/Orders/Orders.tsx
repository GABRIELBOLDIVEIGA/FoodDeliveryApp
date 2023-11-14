import Header from "../Header/Header";
import { OrderCardAdm } from "./OrderCardAdm/OrderCardAdm";
import { useQuery } from "@tanstack/react-query";
import { useGetAllOrders } from "./queries/useQueries";
import { Loader } from "src/components/Loader/Loader";
import { MessageError } from "src/components/MessageError/MessageError";

export const Orders = () => {
  const { getAllOrders } = useGetAllOrders()
  const { data: orders, isLoading } = useQuery({ queryKey: ['getAllOrders'], queryFn: getAllOrders })

  return (
  <section>
    <Header translateKey="OrdersAdm.title" />
    
    <section className="flex flex-col gap-2 py-20 px-4 bg-background">

      {!orders && !isLoading && <MessageError translateKey="OrdersAdm.errorMessage" /> }

      {isLoading && <Loader />}

      {orders?.map((order) => (
        <OrderCardAdm key={order._id} {...order}/>
      ))}
    </section>
  </section>);
};
