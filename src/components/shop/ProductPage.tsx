// src/pages/ProductPage.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Breadcrumb from "@/components/common/Breadcrumb";
import Loader from "@/components/common/Loader";
import Button from "@/components/common/Button";
import { allProducts, type Product } from "@/data/products";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.4 }, // Ускорил
  }),
};

const buttonGroupVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.4,
    },
  },
};

const buttonItemVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(t);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  const product: Product | undefined = allProducts.find((p) => p.slug === id);

  if (!product) {
    return (
      <>
        <Breadcrumb lastLabel="Товар не найден" />
        <section className="max-w-screen-xl mx-auto px-4 py-8 text-text-secondary">
          <h1 className="text-3xl font-bold mb-4">Товар не найден</h1>
        </section>
      </>
    );
  }

  return (
    <>
      <Breadcrumb lastLabel={product.name} />

      <section className="text-text-secondary bg-background body-font overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-4 py-24">
          <div className="flex flex-wrap lg:w-4/5 mx-auto">
            {/* Левая часть — картинка */}
            <motion.div
              className="w-full lg:w-1/2"
              initial="hidden"
              animate="visible"
              custom={0}
              variants={sectionVariants}>
              <motion.img
                alt={product.name}
                src={product.image}
                className="w-full h-64 object-cover object-center rounded bg-background-paper lg:h-auto"
              />
            </motion.div>

            {/* Правая часть — контент */}
            <motion.div
              className="w-full lg:w-1/2 lg:pl-10 lg:py-6 mt-6 lg:mt-0 flex flex-col space-y-6"
              initial="hidden"
              animate="visible">
              {/* Группа 1: Заголовок */}
              <motion.div custom={1} variants={sectionVariants}>
                <h2 className="text-sm font-medium text-text-secondary tracking-widest uppercase">
                  ORLOV BRAND
                </h2>
                <h1 className="text-3xl font-semibold text-text-primary mb-2">
                  {product.name}
                </h1>
              </motion.div>

              {/* Группа 2: Рейтинг и соц. иконки */}
              <motion.div
                className="flex items-center mb-4"
                custom={2}
                variants={sectionVariants}>
                <span className="flex items-center">
                  {[...Array(4)].map((_, i) => (
                    <svg
                      key={i}
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      className="w-4 h-4 text-gold">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    className="w-4 h-4 text-gold">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="ml-2 text-text-secondary">0 отзывов</span>
                </span>
                <span className="flex ml-4 pl-4 py-2 border-l border-secondary space-x-3">
                  {/* Соц. иконки */}
                </span>
              </motion.div>

              {/* Группа 3: Описание */}
              <motion.p
                className="leading-relaxed text-text-secondary"
                custom={3}
                variants={sectionVariants}>
                {product.description || "Описание товара отсутствует."}
              </motion.p>

              {/* Группа 4: Цвета и модели */}
              <motion.div
                className="flex flex-wrap lg:flex-nowrap items-start pb-5 border-b border-secondary gap-8"
                custom={4}
                variants={sectionVariants}>
                {/* Цвета */}
                <div className="flex flex-col gap-3">
                  <span className="text-text-secondary">Цвет</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { color: "#facc15" },
                      { color: "#404040" },
                      { color: "#86efac" },
                      { color: "#3b82f6" },
                      { color: "#f87171" },
                      { color: "#a855f7" },
                    ].map((item, index) => (
                      <button
                        key={index}
                        className={`w-6 h-6 rounded-full border-2 ${
                          selectedColor === item.color
                            ? "border-primary"
                            : "border-secondary"
                        }`}
                        style={{ backgroundColor: item.color }}
                        onClick={() => setSelectedColor(item.color)}></button>
                    ))}
                  </div>
                </div>

                {/* Модели */}
                <div className="flex flex-col gap-3">
                  <span className="text-text-secondary">Модель</span>
                  <div className="flex flex-col gap-2">
                    {[
                      "iPhone 14 Pro",
                      "iPhone 13",
                      "Galaxy S23",
                      "Redmi Note 12",
                      "Pixel 7",
                    ].map((model, index) => (
                      <button
                        key={index}
                        className={`px-3 py-1 rounded ${
                          selectedModel === model
                            ? "bg-secondary text-primary"
                            : "bg-background-paper text-text-secondary"
                        } hover:bg-secondary hover:text-primary transition`}
                        onClick={() => setSelectedModel(model)}>
                        {model}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Группа 5: Цена и кнопки (анимация по очереди слева направо) */}
              <motion.div
                className="flex items-center"
                variants={buttonGroupVariants}
                initial="hidden"
                animate="visible">
                <motion.span
                  className="text-2xl font-medium text-text-primary"
                  variants={buttonItemVariants}>
                  {product.price.toLocaleString()} ₽
                </motion.span>
                <motion.div className="ml-auto flex gap-4">
                  <motion.div variants={buttonItemVariants}>
                    <Button
                      to="/cart"
                      initialText="Добавить в корзину 🛒"
                      hoverText="К оформлению 🎉"
                      variant="light"
                    />
                  </motion.div>
                  <motion.div variants={buttonItemVariants}>
                    <button
                      className="w-10 h-10 bg-background-paper rounded-full flex items-center justify-center text-text-secondary hover:text-primary transition"
                      aria-label="Добавить в избранное">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        className="w-5 h-5">
                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                      </svg>
                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductPage;
