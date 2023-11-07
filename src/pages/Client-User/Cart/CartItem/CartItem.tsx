import { useEffect, useState } from 'react';
import CardProduct from 'src/components/CardProduct/CardProduct';
import { ProductCart } from 'src/context/cart/schema/cartSchema';
import { deliveryInstance } from 'src/services/deliveryInstance';
import { Product } from 'src/validator/product/productValidator';

const CartItem = (product: ProductCart) => {
  const [prod, setProd] = useState<Product>();

  useEffect(() => {
    deliveryInstance
      .get(`/product/${product.productID}`)
      .then((res) => {
        setProd(res.data);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{prod && <CardProduct {...prod} />}</>;
};

export default CartItem;
