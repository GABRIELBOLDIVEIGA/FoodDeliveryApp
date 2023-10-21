
import { createContext } from "react";
import { ProductCart } from "./schema/cartSchema";

export type CartContextType = {
  products: ProductCart[] | [];
  addProduct: (product: ProductCart) => void;
  subitractProduct: (product: ProductCart) => void;
};

export const CartContext = createContext<CartContextType>(null!);
CartContext.displayName = "CartContext";