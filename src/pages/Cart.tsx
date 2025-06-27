import React, { useMemo } from "react";
import { motion, useAnimation } from "framer-motion";
import type { Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

// Цветовые опции для товаров
const colorOptions = [
  { name: "Жёлтый", hex: "#facc15" },
  { name: "Чёрный", hex: "#404040" },
  { name: "Зелёный", hex: "#86efac" },
  { name: "Синий", hex: "#3b82f6" },
  { name: "Красный", hex: "#f87171" },
  { name: "Фиолетовый", hex: "#a855f7" },
];

// Анимации
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, when: "beforeChildren" },
  },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};
const lineVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};
const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

  // Подсчёт итогов
  const { subtotal, vat, discount, total } = useMemo(() => {
    const sub = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const vatAmount = parseFloat((sub * 0.1).toFixed(2));
    const discountAmount = parseFloat((sub * 0.05).toFixed(2));
    const tot = parseFloat((sub + vatAmount - discountAmount).toFixed(2));
    return {
      subtotal: sub,
      vat: vatAmount,
      discount: discountAmount,
      total: tot,
    };
  }, [cartItems]);

  // Анимация секции итогов
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const controls = useAnimation();
  React.useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <motion.section
      className="w-full min-h-[calc(100vh-4rem)] bg-background"
      initial="hidden"
      animate="visible"
      variants={containerVariants}>
      <div className="max-w-screen-xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-4">
        <motion.header className="text-center mb-8" variants={itemVariants}>
          <h1 className="text-4xl font-bold text-primary">Ваша корзина</h1>
        </motion.header>

        {cartItems.length === 0 ? (
          <motion.div
            className="flex justify-center items-center h-[50vh]"
            variants={itemVariants}>
            <p className="text-xl text-text-secondary">Ваша корзина пуста</p>
          </motion.div>
        ) : (
          <>
            {/* Список товаров */}
            <motion.ul className="flex flex-col" variants={containerVariants}>
              {cartItems.map((item) => {
                const colorObj = colorOptions.find(
                  (c) => c.hex === item.selectedColor
                );
                const colorName = colorObj?.name ?? item.selectedColor;
                return (
                  <motion.li
                    key={`${item.slug}-${item.selectedColor}-${item.selectedModel}`}
                    className="flex items-center justify-between gap-4 py-4"
                    variants={itemVariants}>
                    {/* Ссылка на страницу товара */}
                    <Link
                      to={`/catalog/${item.slug}`}
                      className="flex items-center gap-4 flex-1">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 rounded-lg object-contain"
                      />
                      <div className="text-left">
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
                    </Link>

                    {/* Управление количеством */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          decreaseQuantity(
                            item.slug,
                            item.selectedColor,
                            item.selectedModel
                          )
                        }
                        className="px-2 py-1 bg-[#EFE393] text-[#181818] rounded disabled:opacity-50"
                        disabled={item.quantity <= 1}>
                        –
                      </button>
                      <span className="w-6 text-base text-primary text-center">
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
                        className="px-2 py-1 bg-[#EFE393] text-[#181818] rounded">
                        +
                      </button>
                      <button
                        onClick={() =>
                          removeFromCart(
                            item.slug,
                            item.selectedColor,
                            item.selectedModel
                          )
                        }
                        className="text-red-600 text-xl">
                        &times;
                      </button>
                    </div>
                  </motion.li>
                );
              })}
            </motion.ul>

            {/* Разделительная линия */}
            <motion.div
              className="border-t border-[#CCCCCC] mt-4"
              initial="hidden"
              animate="visible"
              variants={lineVariants}
            />

            {/* Итого: простой fade-in */}
            <motion.div
              ref={ref}
              className="mt-8 pt-8"
              initial="hidden"
              animate="visible"
              variants={fadeVariants}>
              <dl className="max-w-lg ml-auto space-y-4 text-sm text-text-secondary">
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
                <button className="bg-primary text-[#181818] px-6 py-3 rounded-sm transition">
                  Оформить заказ
                </button>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </motion.section>
  );
};

export default Cart;
