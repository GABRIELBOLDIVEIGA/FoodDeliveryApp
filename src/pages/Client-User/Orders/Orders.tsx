import { useContext, useEffect, useState } from 'react';
import Header from './OrdersHeader/OrdersHeader';
import { deliveryInstance } from 'src/services/deliveryInstance';
import { AuthContext } from 'src/context/auth/AuthContext';
import { Order, orderSchema } from 'src/validator/order/orderSchema';
import { currencyFormat } from 'src/lib/intl/currencyFormt';
import { Card } from 'src/components/ui/Card/Card';
import { Separator } from 'src/components/ui/Separator/Separator';
import { Loader } from 'lucide-react';
import { LanguageContext } from 'src/context/language/LanguageContenxt';

const Orders = () => {
  const { t } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState<Array<Order>>();

  useEffect(() => {
    deliveryInstance
      .get(`/order/userOrders/${user?.userId}`)
      .then((res) => {
        const parse = orderSchema.array().safeParse(res.data);
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
        {orders?.map((order, index) => (
          <Card key={index} className="p-2 bg-muted dark:border-none">
            <div className="font-bold pb-2">
              {t('orders.cardTitle')} {index + 1}
            </div>
            {order.products.map((prod) => (
              <div key={prod.productID} className="flex justify-between gap-2">
                <p>{prod.name}</p>
                <div className="flex gap-2">
                  <p>{prod.amount}x</p>
                  <p>{currencyFormat(prod.price)}</p>
                </div>
              </div>
            ))}
            <Separator className="my-2" />
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <p>{currencyFormat(order.total)}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Orders;
