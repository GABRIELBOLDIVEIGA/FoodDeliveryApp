import { Button } from 'src/components/ui/Button/Button';
import { useContext } from 'react';
import { CartContext } from 'src/context/cart/CartContext';
import { LanguageContext } from 'src/context/language/LanguageContenxt';
import { useNavigate } from 'react-router-dom';
import { currencyFormat } from 'src/lib/intl/currencyFormt';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'src/components/ui/AlertDialog/AlertDialog';
import CartItem from './CartItem/CartItem';
import Header from './CartHeader/CartHeader';
import useSubmitOrder from './submitOrder/useSubmitOrder';
import CardAddress from './CardAddress/CardAddress';

const Cart = () => {
  const { products, total } = useContext(CartContext);
  const { t } = useContext(LanguageContext);
  const { status, submitOrder, resetStatus } = useSubmitOrder();
  const navigate = useNavigate();

  return (
    <section className="pb-[100px] bg-background">
      <Header />

      <div className="flex flex-col gap-2 pt-16 px-2">
        {products.map((product) => (
          <CartItem key={product.productID} {...product} />
        ))}

        <div>
          {products.map((product) => (
            <div key={product.productID}>
              <div className="flex justify-between py-1">
                <p>
                  <span className="font-bold">{product.name}</span>{' '}
                  {product.amount} uni.
                </p>
                <p>{currencyFormat(product.price * product.amount)}</p>
              </div>
            </div>
          ))}
          <div className="flex justify-between py-1 border-t-2 ">
            <p className="font-bold">Total: </p>
            <p className="font-bold">{currencyFormat(total)}</p>
          </div>
        </div>
      </div>

      <CardAddress />

      <div className="w-full px-2 mt-6">
        <Button
          disabled={products.length === 0}
          onClick={() => submitOrder()}
          className="w-full"
        >
          {t('cart.confirm')}
        </Button>
      </div>

      <AlertDialog open={status?.status ? true : false}>
        <AlertDialogTrigger asChild></AlertDialogTrigger>
        <AlertDialogContent className="mx-2">
          <AlertDialogHeader>
            <AlertDialogTitle>{status?.message}</AlertDialogTitle>
            <AlertDialogDescription>
              {status?.status === 201
                ? 'Voltar para a Home'
                : 'Tente outra vez'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                resetStatus();
                if (status?.status === 201) {
                  navigate('/restricted/home');
                }
              }}
            >
              {t('cart.buttonAlert')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default Cart;
