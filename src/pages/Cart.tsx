// src/pages/Cart.tsx
import React, { useState } from "react";
// import { Trash2 } from "lucide-react";

interface CartItemType {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const initialCart: CartItemType[] = [
  {
    id: 1,
    name: "Apple iMac 27”",
    price: 1499,
    image: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg",
    quantity: 1,
  },
  {
    id: 2,
    name: "Apple iPhone 14",
    price: 999,
    image:
      "https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-light.svg",
    quantity: 2,
  },
  {
    id: 3,
    name: "Apple iPad Air",
    price: 898,
    image: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-light.svg",
    quantity: 1,
  },
  {
    id: 4,
    name: "MacBook Pro 16″",
    price: 4499,
    image:
      "https://flowbite.s3.amazonaws.com/blocks/e-commerce/macbook-pro-light.svg",
    quantity: 4,
  },
  {
    id: 5,
    name: "PlayStation 5",
    price: 499,
    image: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-light.svg",
    quantity: 1,
  },
  {
    id: 6,
    name: "Xbox Series X",
    price: 499,
    image: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/xbox-light.svg",
    quantity: 1,
  },
  {
    id: 7,
    name: "Apple Watch SE",
    price: 399,
    image:
      "https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg",
    quantity: 2,
  },
];

const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartItemType[]>(initialCart);

  const updateQuantity = (id: number, amount: number) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = 299;
  const pickup = 99;
  const tax = 799;
  const total = subtotal - discount + pickup + tax;

  return (
    <section className="bg-background py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-text-primary sm:text-2xl mb-8">
          Корзина
        </h2>

        <div className="lg:flex lg:items-start lg:gap-8">
          {/* Cart Items */}
          <div className="w-full space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-background-paper rounded-lg p-4 border dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-12 h-12" />
                  <span className="text-sm text-text-primary">{item.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="h-8 w-8 rounded bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-lg">
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="h-8 w-8 rounded bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-lg">
                    +
                  </button>
                </div>

                <span className="text-sm font-medium text-text-primary">
                  {(item.price * item.quantity).toLocaleString()} ₽
                </span>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700">
                  {/* <Trash2 size={20} /> */}
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3 mt-8 lg:mt-0 space-y-4">
            <div className="rounded-lg border border-gray-200 bg-background-paper p-4 shadow-sm dark:border-gray-700">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Сводка заказа
              </h3>
              <div className="space-y-2 text-sm text-text-secondary">
                <div className="flex justify-between">
                  <span>Исходная стоимость</span>
                  <span>{subtotal.toLocaleString()} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span>Скидка</span>
                  <span className="text-green-500">- {discount} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span>Самовывоз</span>
                  <span>{pickup} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span>Налог</span>
                  <span>{tax} ₽</span>
                </div>
              </div>
              <div className="flex justify-between border-t pt-2 mt-2 text-base font-semibold text-text-primary">
                <span>Итого</span>
                <span>{total.toLocaleString()} ₽</span>
              </div>
              <div className="flex gap-4 mt-6">
                <button className="w-1/2 py-2 rounded-lg border text-sm text-text-primary hover:bg-gray-100 dark:hover:bg-gray-700">
                  Продолжить покупки
                </button>
                <button className="w-1/2 py-2 rounded-lg bg-primary text-sm text-primary-contrast hover:bg-yellow-300">
                  Оформить заказ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
