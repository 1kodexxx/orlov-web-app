import React, { useMemo } from "react";
import { useCart } from "@/context/CartContext";

// Предопределённый список цветов (имя + hex)
const colorOptions = [
  { name: "Жёлтый", hex: "#facc15" },
  { name: "Чёрный", hex: "#404040" },
  { name: "Зелёный", hex: "#86efac" },
  { name: "Синий", hex: "#3b82f6" },
  { name: "Красный", hex: "#f87171" },
  { name: "Фиолетовый", hex: "#a855f7" },
];

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

  // Подсчёт сумм
  const { subtotal, vat, discount, total } = useMemo(() => {
    const sub = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const vatAmount = parseFloat((sub * 0.1).toFixed(2)); // 10% НДС
    const discountAmount = parseFloat((sub * 0.05).toFixed(2)); // 5% скидка
    const tot = parseFloat((sub + vatAmount - discountAmount).toFixed(2));

    return {
      subtotal: sub,
      vat: vatAmount,
      discount: discountAmount,
      total: tot,
    };
  }, [cartItems]);

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-background py-8">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Ваша корзина</h1>
        </header>

        {cartItems.length === 0 ? (
          <div className="flex justify-center items-center h-[50vh]">
            <p className="text-xl text-text-secondary">Ваша корзина пуста</p>
          </div>
        ) : (
          <>
            {/* Список товаров */}
            <ul className="space-y-6">
              {cartItems.map((item) => {
                // Находим объект цвета по hex
                const colorObj = colorOptions.find(
                  (c) => c.hex === item.selectedColor
                );
                const colorName = colorObj?.name ?? item.selectedColor;

                return (
                  <li
                    key={`${item.slug}-${item.selectedColor}-${item.selectedModel}`}
                    className="flex items-center gap-4 border-b border-gray-700 pb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />

                    <div className="flex-1">
                      <p className="text-lg text-primary font-medium">
                        {item.name}
                      </p>
                      <p className="text-sm text-text-secondary">
                        Модель:{" "}
                        <span className="text-primary">
                          {item.selectedModel}
                        </span>
                      </p>
                      <p className="text-sm text-text-secondary">
                        Цвет:{" "}
                        <span style={{ color: item.selectedColor }}>
                          {colorName}
                        </span>
                      </p>
                    </div>

                    {/* Управление количеством */}
                    {/* Управление количеством */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          decreaseQuantity(
                            item.slug,
                            item.selectedColor,
                            item.selectedModel
                          )
                        }
                        className="px-2 py-1 bg-[#EFE393] rounded disabled:opacity-50"
                        disabled={item.quantity <= 1}
                        aria-label="Уменьшить количество">
                        <span className="text-[#181818] font-bold text-lg">
                          –
                        </span>
                      </button>
                      <span className="w-6 text-center text-base text-primary">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          increaseQuantity(
                            item.slug,
                            item.selectedColor,
                            item.selectedModel
                          )
                        }
                        className="px-2 py-1 bg-[#EFE393] rounded"
                        aria-label="Увеличить количество">
                        <span className="text-[#181818] font-bold text-lg">
                          +
                        </span>
                      </button>
                    </div>

                    {/* Удалить */}
                    <button
                      onClick={() =>
                        removeFromCart(
                          item.slug,
                          item.selectedColor,
                          item.selectedModel
                        )
                      }
                      className="ml-4 text-red-600 text-xl transition hover:opacity-75"
                      aria-label="Удалить товар">
                      &times;
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Итоги */}
            <div className="mt-8 border-t border-gray-700 pt-8">
              <div className="w-full max-w-lg ml-auto space-y-4">
                <dl className="space-y-1 text-sm text-text-secondary">
                  <div className="flex justify-between">
                    <dt>Промежуточный итог</dt>
                    <dd>₽{subtotal.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>НДС (10%)</dt>
                    <dd>₽{vat.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Скидка (5%)</dt>
                    <dd>-₽{discount.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between font-medium text-base">
                    <dt>Итого</dt>
                    <dd>₽{total.toFixed(2)}</dd>
                  </div>
                </dl>
                <div className="flex justify-end mt-4">
                  <a
                    href="#"
                    className="bg-primary text-[#181818] px-6 py-3 rounded-sm transition">
                    Оформить заказ
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
