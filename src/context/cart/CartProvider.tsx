import { useEffect, useState } from 'react';
import { CartContext } from './CartContext';
import { ProductCart } from './schema/cartSchema';

export const CartProvider = ({ children }: { children: JSX.Element }) => {
  const [products, setProducts] = useState<ProductCart[] | []>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const productPrice_X_productAmount: Array<number> = products.map(
      (product) => product.amount * product.price
    );

    const tt = productPrice_X_productAmount.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    setTotal(tt);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const addProduct = (product: ProductCart) => {
    const existe = products?.find(
      (prod) => prod.productID === product.productID
    );

    if (!existe) {
      product.amount = product.amount + 1;
      setProducts([...products, product]);
      return;
    } else {
      const newList = products.map((prod) => {
        if (prod.productID === product.productID) {
          prod.amount = prod.amount + 1;
          return prod;
        } else {
          return prod;
        }
      });

      setProducts([...newList]);
    }
  };

  const subitractProduct = (product: ProductCart) => {
    const existe = products?.find(
      (prod) => prod.productID === product.productID
    );

    if (existe?.amount === 1) {
      removeProduct(product);
      return;
    }

    if (existe) {
      const newList = products.map((prod) => {
        if (prod.productID === product.productID) {
          if (prod.amount > 0) {
            prod.amount = prod.amount - 1;
          }
          return prod;
        } else {
          return prod;
        }
      });

      setProducts([...newList]);
    }
  };

  const removeProduct = (product: ProductCart) => {
    const newList = products.filter(
      (prod) => prod.productID != product.productID
    );
    setProducts(newList);
  };

  const resetCart = () => {
    setTotal(0);
    setProducts([]);
  };

  return (
    <CartContext.Provider
      value={{ products, total, addProduct, subitractProduct, resetCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
