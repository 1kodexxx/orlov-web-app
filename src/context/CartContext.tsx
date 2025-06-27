import { createContext, useContext, useState } from "react";
import type { Product } from "@/data/products";
import type { ReactNode } from "react";

// ✅ Расширяем CartItem
interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
  selectedModel: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void; // ✅ Меняем тип аргумента
  removeFromCart: (
    slug: string,
    selectedColor: string,
    selectedModel: string
  ) => void;
  increaseQuantity: (
    slug: string,
    selectedColor: string,
    selectedModel: string
  ) => void;
  decreaseQuantity: (
    slug: string,
    selectedColor: string,
    selectedModel: string
  ) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // ✅ Обновлённый addToCart
  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (cartItem) =>
          cartItem.slug === item.slug &&
          cartItem.selectedColor === item.selectedColor &&
          cartItem.selectedModel === item.selectedModel
      );

      if (existing) {
        return prev.map((cartItem) =>
          cartItem.slug === item.slug &&
          cartItem.selectedColor === item.selectedColor &&
          cartItem.selectedModel === item.selectedModel
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (
    slug: string,
    selectedColor: string,
    selectedModel: string
  ) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.slug === slug &&
            item.selectedColor === selectedColor &&
            item.selectedModel === selectedModel
          )
      )
    );
  };

  const increaseQuantity = (
    slug: string,
    selectedColor: string,
    selectedModel: string
  ) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.slug === slug &&
        item.selectedColor === selectedColor &&
        item.selectedModel === selectedModel
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (
    slug: string,
    selectedColor: string,
    selectedModel: string
  ) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.slug === slug &&
          item.selectedColor === selectedColor &&
          item.selectedModel === selectedModel
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
