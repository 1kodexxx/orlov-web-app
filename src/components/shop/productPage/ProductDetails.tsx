// src/components/shop/productPage/ProductDetails.tsx
import { useEffect, useState } from "react";
import { ColorSelector, ModelSelector, ProductActions } from "./";
import type { ProductRow } from "@/features/catalog/api"; // новый API
import { useCart } from "@/context/useCart";
import { Confetti } from "@/animations";

type NotificationSetter = React.Dispatch<
  React.SetStateAction<{
    variant: "success" | "error";
    title: string;
    description?: string;
  } | null>
>;

interface ProductDetailsProps {
  product: ProductRow;
  setNotification: NotificationSetter;
}

const colorOptions = [
  { name: "Жёлтый", hex: "#facc15" },
  { name: "Чёрный", hex: "#404040" },
  { name: "Зелёный", hex: "#86efac" },
  { name: "Синий", hex: "#3b82f6" },
  { name: "Красный", hex: "#f87171" },
  { name: "Фиолетовый", hex: "#a855f7" },
];

function firstImageUrl(
  images: ProductRow["images"] | undefined,
  fallback = "/placeholder.png"
): string {
  if (!images) return fallback;
  if (Array.isArray(images) && images.length > 0) {
    const first = images[0] as unknown;
    if (typeof first === "string") return first;
    const obj = first as { url?: string; position?: number } | null;
    return obj?.url || fallback;
  }
  return fallback;
}

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

  const [confettiTrigger, setConfettiTrigger] = useState(false);
  const [clickX, setClickX] = useState(0);
  const [clickY, setClickY] = useState(0);

  const { addToCart } = useCart();

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleBuy = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!selectedColor || !selectedModel) {
      setNotification({
        variant: "error",
        title: "Пожалуйста, выберите цвет и модель",
        description: "Перед покупкой необходимо выбрать параметры товара.",
      });
      return;
    }

    setClickX(e.clientX);
    setClickY(e.clientY);
    setConfettiTrigger(false);
    setTimeout(() => setConfettiTrigger(true), 0);

    const imageUrl = firstImageUrl(product.images);

    // приводим к формату cart item (строгое соответствие типам)
    if (!selectedColor || !selectedModel) {
      setNotification({
        variant: "error",
        title: "Пожалуйста, выберите цвет и модель",
      });
      return;
    }

    addToCart({
      slug: product.sku,
      name: product.name,
      image: imageUrl ?? "/placeholder.png",
      price: product.price,
      selectedColor: selectedColor.hex,
      selectedModel: selectedModel,
      quantity: 1,
    });

    setNotification({
      variant: "success",
      title: "Товар добавлен в корзину!",
      description: `Модель: ${selectedModel}<br/>Цвет: <span style="color: ${selectedColor.hex};">${selectedColor.name}</span>`,
    });
  };

  return (
    <div className="flex-1 flex flex-col space-y-6 relative">
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

      {/* Описание */}
      <p
        className={`leading-relaxed text-text-secondary transition-all duration-700 ease-out delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
        {product.description || "Описание товара отсутствует."}
      </p>

      {/* Параметры */}
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
        {/* Модели как заглушка; при желании подставим реальные из phone_model */}
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

      <ProductActions
        price={product.price}
        isVisible={isVisible}
        delay={400}
        onBuy={handleBuy}
      />

      <Confetti
        trigger={confettiTrigger}
        x={clickX}
        y={clickY}
        onComplete={() => setConfettiTrigger(false)}
      />
    </div>
  );
}
