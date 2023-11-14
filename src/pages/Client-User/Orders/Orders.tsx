import { useContext, useEffect, useState } from 'react';
import Header from './OrdersHeader/OrdersHeader';
import { deliveryInstanceOLD } from 'src/services/deliveryInstance';
import { AuthContext } from 'src/context/auth/AuthContext';
import { Order, orderValidator } from 'src/validator/orderUser/orderUserValidator';
import { Loader } from 'lucide-react';
import OrderCard from 'src/components/Order/Order';

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState<Array<Order>>();

  useEffect(() => {
    deliveryInstanceOLD
      .get(`/order/userOrders/${user?.userId}`)
      .then((res) => {
        const parse = orderValidator.array().safeParse(res.data);
        setOrders(parse.success ? parse.data : undefined);
      })
      .catch((err) => {
        console.log(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="bg-background">
      <Header />

      <div className="flex flex-col gap-4 mx-2 p-2 rounded-md py-[72px]">
        {!orders && (
          <div className="flex justify-center">
            <Loader className="animate-spin" />
          </div>
        )}

        <div className='flex flex-col gap-2'>
          {orders?.map((order) => (
            <OrderCard key={order._id} {...order} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Orders;
