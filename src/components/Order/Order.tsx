import { useContext } from "react"
import { Card } from "../ui/Card/Card"
import { LanguageContext } from "src/context/language/LanguageContenxt"
import { Order } from 'src/validator/orderUser/orderUserValidator';
import { currencyFormat } from "src/lib/intl/currencyFormt";
import { Separator } from 'src/components/ui/Separator/Separator';

const OrderCard = (order: Order) => {
  const { t } = useContext(LanguageContext);

  return (
    <Card className="p-2 bg-muted dark:border-none">
      <div className="font-bold pb-2">
        {t('orders.cardTitle')} 
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
  )
}

export default OrderCard