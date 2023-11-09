import { useContext } from "react"
import { Card } from "src/components/ui/Card/Card"
import { Separator } from "src/components/ui/Separator/Separator"
import { LanguageContext } from "src/context/language/LanguageContenxt"
import { currencyFormat } from "src/lib/intl/currencyFormt"
import { OrderAdm } from "src/validator/orderAdm/orderAdm"

export const OrderCardAdm = (order: OrderAdm) => {
  const deliveryAddress = JSON.parse(order.deliveryAddress)
  const { t } = useContext(LanguageContext)
  return (
    <Card className="p-2 bg-muted dark:border-none">
      <div className="font-bold pb-2">
        {t('OrderCardAdm.title')} 
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
      
      <div>
        <p className="font-bold pb-2">{t('OrderCardAdm.deliveryAddress')}</p>

        <div>
          {deliveryAddress.zipCode && 
            <p className="flex justify-between text-sm">
              <span className="font-semibold pr-2">{t('OrderCardAdm.zipCode')}:</span> 
              {deliveryAddress.zipCode}
            </p>
          }
          {deliveryAddress.neighborhood && 
            <p className="flex justify-between text-sm">
              <span className="font-semibold pr-2">{t('OrderCardAdm.neighborhood')}:</span> 
              {deliveryAddress.neighborhood}
            </p>
          }
          {deliveryAddress.street && 
            <p className="flex justify-between text-sm">
              <span className="font-semibold pr-2">{t('OrderCardAdm.street')}:</span>
              {deliveryAddress.street}
            </p>
          }
          {deliveryAddress.city && 
            <p className="flex justify-between text-sm">
              <span className="font-semibold pr-2">{t('OrderCardAdm.city')}:</span> 
              {deliveryAddress.city}
            </p>
          }
          {deliveryAddress.number && 
            <p className="flex justify-between text-sm">
              <span className="font-semibold pr-2">{t('OrderCardAdm.number')}</span> 
              {deliveryAddress.number}
            </p>
          }
        </div>

        <Separator className="my-2" />
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <p>{currencyFormat(order.total)}</p>
        </div>
      </div>
    </Card>
  )
}