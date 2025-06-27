import { useState } from "react";
import { ColorSelector, ModelSelector, PriceActions } from "./";
import { type Product } from "@/data/products";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  return (
    <div className="flex-1 flex flex-col space-y-6">
      <div>
        <h2 className="text-sm font-medium text-text-secondary tracking-widest uppercase">
          ORLOV BRAND
        </h2>
        <h1 className="text-2xl sm:text-3xl font-semibold text-text-primary mt-1">
          {product.name}
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center mb-4 gap-4">
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

      <p className="leading-relaxed text-text-secondary">
        {product.description || "Описание товара отсутствует."}
      </p>

      <div className="flex flex-col md:flex-row md:justify-between gap-8 pb-5 border-b border-secondary">
        <ColorSelector
          colors={[
            "#facc15",
            "#404040",
            "#86efac",
            "#3b82f6",
            "#f87171",
            "#a855f7",
          ]}
          selected={selectedColor}
          onSelect={setSelectedColor}
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

      <PriceActions price={product.price} />
    </div>
  );
}
