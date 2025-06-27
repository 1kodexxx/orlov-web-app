import { useState, useEffect } from "react";
import { ColorSelector, ModelSelector, PriceActions } from "./";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductDetailsProps {
  product: Product;
  setNotification: React.Dispatch<
    React.SetStateAction<{
      variant: "success" | "error";
      title: string;
      description?: string;
    } | null>
  >;
}

const colorOptions = [
  { name: "Жёлтый", hex: "#facc15" },
  { name: "Чёрный", hex: "#404040" },
  { name: "Зелёный", hex: "#86efac" },
  { name: "Синий", hex: "#3b82f6" },
  { name: "Красный", hex: "#f87171" },
  { name: "Фиолетовый", hex: "#a855f7" },
];

export default function ProductDetails({
  product,
  setNotification,
}: ProductDetailsProps) {
  const [selectedColor, setSelectedColor] = useState<{
    name: string;
    hex: string;
  } | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleBuy = () => {
    if (!selectedColor || !selectedModel) {
      setNotification({
        variant: "error",
        title: "Пожалуйста, выберите цвет и модель",
        description: "Перед покупкой необходимо выбрать параметры товара.",
      });
      return;
    }

    addToCart({
      ...product,
      selectedColor: selectedColor.hex,
      selectedModel,
      quantity: 1,
    });

    setNotification({
      variant: "success",
      title: "Товар добавлен в корзину!",
      description: `Модель: ${selectedModel}<br/>Цвет: <span style="color: ${selectedColor.hex};">${selectedColor.name}</span>`,
    });
  };

  return (
    <div className="flex-1 flex flex-col space-y-6">
      {/* Блок заголовка */}
      <div
        className={`transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
        <h2 className="text-sm font-medium text-text-secondary tracking-widest uppercase">
          ORLOV BRAND
        </h2>
        <h1 className="text-2xl sm:text-3xl font-semibold text-text-primary mt-1">
          {product.name}
        </h1>
      </div>

      {/* Блок рейтинга */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center mb-4 gap-4 transition-all duration-700 ease-out delay-100 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
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
      </div>

      {/* Блок описания */}
      <p
        className={`leading-relaxed text-text-secondary transition-all duration-700 ease-out delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
        {product.description || "Описание товара отсутствует."}
      </p>

      {/* Блок выбора цвета и модели */}
      <div
        className={`flex flex-col md:flex-row md:justify-between gap-8 pb-5 border-b border-secondary transition-all duration-700 ease-out delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
        <ColorSelector
          colors={colorOptions.map((c) => c.hex)}
          selected={selectedColor?.hex || null}
          onSelect={(hex) => {
            const color = colorOptions.find((c) => c.hex === hex);
            if (color) setSelectedColor(color);
          }}
        />
        <ModelSelector
          models={[
            "iPhone 14 Pro",
            "iPhone 13",
            "Galaxy S23",
            "Redmi Note 12",
            "Pixel 7",
          ]}
          selected={selectedModel}
          onSelect={setSelectedModel}
        />
      </div>

      {/* Блок цены и кнопки */}
      <PriceActions
        price={product.price}
        isVisible={isVisible}
        delay={400}
        onBuy={handleBuy}
      />
    </div>
  );
}
