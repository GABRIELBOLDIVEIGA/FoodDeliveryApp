import { useContext, useState } from 'react';
import { AuthContext } from 'src/context/auth/AuthContext';
import { CartContext } from 'src/context/cart/CartContext';
import { deliveryInstanceOLD } from 'src/services/deliveryInstance';

const useSubmitOrder = () => {
  const { user } = useContext(AuthContext);
  const { products, total, resetCart } = useContext(CartContext);
  const [status, setStatus] = useState<{
    status: number;
    message: string;
  } | null>(null);

  const deliveryAddress = {
    zipCode: user?.zipCode,
    neighborhood: user?.neighborhood,
    street: user?.street,
    city: user?.city,
    number: user?.number,
  };

  const order = {
    user: user?.userId,
    deliveryAddress: JSON.stringify(deliveryAddress),
    products: products,
    total: total,
  };

  const submitOrder = () => {
    deliveryInstanceOLD
      .post('/order', order)
      .then((res) => {
        if (res.status === 201) {
          setStatus({
            status: 201,
            message: 'Pedido gerado com sucesso!',
          });
          resetCart();
        }
      })
      .catch((err) => {
        setStatus({
          status: err.response.status,
          message: 'Tivemos algum problema para enviar seu pedido...',
        });
      });
  };

  const resetStatus = () => {
    setStatus(null);
  };

  return { status, submitOrder, resetStatus };
};

export default useSubmitOrder;
