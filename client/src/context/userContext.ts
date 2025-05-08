import { ReactNode, useState, createContext } from "react";
import { ProductsProps } from "../Pages/Home";

interface CarContextData {
  cart: CartProps[];
  cartAmount: number; 
  addCartItem: (newProduct: ProductsProps) => void;
  totalPrice: (products: CartProps[]) => string;
  removeItem: (product: CartProps) => void;
}

interface CartProps {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
  amount: number;
  total: number;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CarContextData);

export function CartProvider({ children }: CartProviderProps) {
  function addCartItem(newProduct: ProductsProps): void {
    const itemIndex = cart.findIndex((item) => item.id === newProduct.id);

    if (itemIndex !== -1) {
      const updatedCart = cart.map((item, index) =>
        index === itemIndex
          ? {
              ...item,
              amount: item.amount + 1,
              total: (item.amount + 1) * item.price,
            }
          : item
      );

      setCart(updatedCart);
      return;
    }

    const data = {
      ...newProduct,
      amount: 1,
      total: newProduct.price,
    };

    setCart([...cart, data]);
  }

  function removeItem(product: CartProps) {
    const itemIndex = cart.findIndex((item) => item.id === product.id);

    if (itemIndex !== -1) {
      if (cart[itemIndex].amount > 1) {
        const updatedCart = cart.map((item, index) =>
          index === itemIndex
            ? {
                ...item,
                amount: item.amount - 1,
                total: (item.amount - 1) * item.price,
              }
            : item
        );

        setCart(updatedCart);
        return;
      }

      setCart(cart.filter((item) => item.id !== product.id));
    }
  }

  function totalPrice(products: CartProps[]) {
    const result = products.reduce((acc, obj) => {
      return acc + obj.total;
    }, 0);
    const resultFomarted = result.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return resultFomarted;
  }

  const [cart, setCart] = useState<CartProps[]>([]);
  return (
    <CartContext.Provider
      value={{
        cart,
        cartAmount: cart.length,
        addCartItem,
        totalPrice,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
