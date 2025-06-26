import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Breadcrumb, Loader, Button } from "@/components/common";
import { allProducts, type Product } from "@/data/products";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  // для тача/драг-свайпов
  const [touchStartX, setTouchStartX] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(t);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  const product: Product | undefined = allProducts.find((p) => p.slug === id);
  if (!product) {
    return (
      <>
        <Breadcrumb lastLabel="Товар не найден" />
        <section className="max-w-screen-xl mx-auto px-4 py-8 sm:px-6 lg:px-8 text-text-secondary min-h-screen flex items-center justify-center">
          <h1 className="text-3xl font-bold">Товар не найден</h1>
        </section>
      </>
    );
  }

  const handlePrev = () => setSlideIndex((slideIndex + 2) % 3);
  const handleNext = () => setSlideIndex((slideIndex + 1) % 3);

  // mouse drag для десктопа
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setTouchStartX(e.clientX);
  };
  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    const diff = e.clientX - touchStartX;
    if (diff > 50) handlePrev();
    else if (diff < -50) handleNext();
  };

  // тач для мобилок
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX;
    if (diff > 50) handlePrev();
    else if (diff < -50) handleNext();
  };

  return (
    <>
      <Breadcrumb lastLabel={product.name} />

      {/* Кнопка «Назад» */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 lg:mt-1">
        <div className="lg:w-4/5 mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="text-primary hover:underline flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Назад в каталог
          </button>
        </div>
      </div>

      <section className="bg-background body-font overflow-hidden min-h-[calc(100vh-4rem)] flex items-center">
        <div className="max-w-screen-xl mx-auto px-4 py-4 sm:px-6 sm:py-8 lg:px-8 w-full lg:-mt-12">
          <div className="flex flex-col lg:flex-row lg:w-4/5 mx-auto gap-8 lg:items-stretch">
            {/* Слайдер без реакции на прокрутку */}
            <div
              className="w-full md:w-2/3 lg:w-1/2 relative overflow-hidden select-none"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}>
              <div
                className="flex transition-transform duration-300"
                style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
                {[0, 1, 2].map((idx) => (
                  <img
                    key={idx}
                    src={product.image}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full h-full md:max-h-[60vh] lg:max-h-[80vh] object-contain object-center rounded flex-shrink-0"
                  />
                ))}
              </div>

              <button
                onClick={handlePrev}
                className="absolute top-1/2 left-2 -translate-y-1/2 bg-background-paper bg-opacity-60 hover:bg-opacity-90 p-2 rounded-full"
                aria-label="Previous slide">
                <svg
                  className="w-5 h-5 text-text-secondary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="absolute top-1/2 right-2 -translate-y-1/2 bg-background-paper bg-opacity-60 hover:bg-opacity-90 p-2 rounded-full"
                aria-label="Next slide">
                <svg
                  className="w-5 h-5 text-text-secondary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Правая часть — контент */}
            <div className="w-full lg:w-1/2 flex flex-col space-y-6">
              {/* Заголовок */}
              <div>
                <h2 className="text-sm font-medium text-text-secondary tracking-widest uppercase">
                  ORLOV BRAND
                </h2>
                <h1 className="text-2xl sm:text-3xl font-semibold text-text-primary mt-1">
                  {product.name}
                </h1>
              </div>

              {/* Рейтинг и соц. иконки */}
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
                <div className="flex items-center border-l border-secondary pl-4 space-x-3">
                  {/* Соц. иконки */}
                </div>
              </div>

              {/* Описание */}
              <p className="leading-relaxed text-text-secondary">
                {product.description || "Описание товара отсутствует."}
              </p>

              {/* Цвета и модели */}
              <div className="flex flex-col md:flex-row md:justify-between gap-8 pb-5 border-b border-secondary">
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
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        className={`w-6 h-6 rounded-full border-2 ${
                          selectedColor === item.color
                            ? "border-primary"
                            : "border-secondary"
                        }`}
                        style={{ backgroundColor: item.color }}
                        onClick={() => setSelectedColor(item.color)}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-text-secondary">Модель</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "iPhone 14 Pro",
                      "iPhone 13",
                      "Galaxy S23",
                      "Redmi Note 12",
                      "Pixel 7",
                    ].map((model, idx) => (
                      <button
                        key={idx}
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
              </div>

              {/* Цена и кнопки */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-6">
                <span className="text-2xl sm:text-3xl font-medium text-text-primary">
                  {product.price.toLocaleString()} ₽
                </span>
                <div className="ml-0 sm:ml-auto flex gap-3">
                  <Button
                    to="/cart"
                    initialText="Добавить в корзину 🛒"
                    hoverText="К оформлению 🎉"
                    variant="light"
                  />
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductPage;
