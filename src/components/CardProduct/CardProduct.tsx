import { useContext } from 'react';
import { CartContext } from 'src/context/cart/CartContext';
import { cn } from 'src/lib/utils';
import { Product } from 'src/validator/product/productValidator';
import { Button } from '../ui/Button/Button';
import { Minus, Plus } from 'lucide-react';
import _404_img from 'src/assets/404FullHD.jpg';
import { currencyFormat } from 'src/lib/intl/currencyFormt';

const CardProduct = (product: Product) => {
  const { products, addProduct, subitractProduct } = useContext(CartContext);

  const productCart = {
    productID: product._id,
    name: product.name,
    price: product.activePromotion ? product.promotionalPrice : product.price,
    amount: 0,
  };

  return (
    <div className="flex gap-2 rounded-xl p-2 shadow-md bg-primary">
      <div
        className={cn(`self-center w-[190px] h-[120px] rounded-xl bg-muted`)}
      >
        <img
          className={cn(`rounded-xl w-full h-full`)}
          onError={(ev) => (ev.currentTarget.src = _404_img)}
          src={product.img}
        />
      </div>

      <div className="flex flex-col justify-between w-1/2">
        <div>
          <h3 className="text-secondary dark:text-secondary-foreground font-bold tracking-wider">
            {product.name}
          </h3>
          <p className="dark:text-secondary text-sm font-semibold">
            {product.description}
          </p>
        </div>

        <p className="font-bold text-right pr-2">
          {product.activePromotion
            ? currencyFormat(product.promotionalPrice)
            : currencyFormat(product.price)}
        </p>

        <div className="w-full flex justify-between items-center rounded-md bg-muted">
          <Button
            onClick={() => {
              subitractProduct(productCart);
            }}
            size="icon"
            className="bg-transparent text-secondary-foreground"
          >
            <Minus />
          </Button>
          <p className=" font-semibold">
            {products.map((product) => {
              if (product.productID === productCart.productID) {
                return product.amount;
              }
            })}
          </p>
          <Button
            onClick={() => {
              addProduct(productCart);
            }}
            size="icon"
            className="bg-transparent text-secondary-foreground"
          >
            <Plus />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
