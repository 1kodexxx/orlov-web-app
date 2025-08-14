import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

/** Минимальный набор полей товара, которые реально нужны корзине */
export type ProductForCart = {
  slug: string;
  name: string;
  image: string; // URL первой картинки/плейсхолдер
  price: number;
};

/** То, что лежит в корзине */
export interface CartItem extends ProductForCart {
  quantity: number;
  selectedColor: string;
  selectedModel: string;
}

/** Аргумент для addToCart: quantity опциональный — по умолчанию 1 */
export type AddToCartInput = ProductForCart & {
  selectedColor: string;
  selectedModel: string;
  quantity?: number;
};

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: AddToCartInput) => void;
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

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch {
      /* ignore */
    }
  }, [cartItems]);

  const addToCart = (item: AddToCartInput) => {
    const quantity = item.quantity ?? 1;

    setCartItems((prev) => {
      const existing = prev.find(
        (ci) =>
          ci.slug === item.slug &&
          ci.selectedColor === item.selectedColor &&
          ci.selectedModel === item.selectedModel
      );

      if (existing) {
        return prev.map((ci) =>
          ci.slug === item.slug &&
          ci.selectedColor === item.selectedColor &&
          ci.selectedModel === item.selectedModel
            ? { ...ci, quantity: ci.quantity + quantity }
            : ci
        );
      }

      const next: CartItem = {
        slug: item.slug,
        name: item.name,
        image: item.image,
        price: item.price,
        selectedColor: item.selectedColor,
        selectedModel: item.selectedModel,
        quantity,
      };
      return [...prev, next];
    });
  };

  const removeFromCart = (
    slug: string,
    selectedColor: string,
    selectedModel: string
  ) => {
    setCartItems((prev) =>
      prev.filter(
        (ci) =>
          !(
            ci.slug === slug &&
            ci.selectedColor === selectedColor &&
            ci.selectedModel === selectedModel
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
      prev.map((ci) =>
        ci.slug === slug &&
        ci.selectedColor === selectedColor &&
        ci.selectedModel === selectedModel
          ? { ...ci, quantity: ci.quantity + 1 }
          : ci
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
        .map((ci) =>
          ci.slug === slug &&
          ci.selectedColor === selectedColor &&
          ci.selectedModel === selectedModel
            ? { ...ci, quantity: ci.quantity - 1 }
            : ci
        )
        .filter((ci) => ci.quantity > 0)
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
