import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb, Loader } from "@/components/common";
import { allProducts, type Product } from "@/data/products";
import BackTo from "./BackTo";
import ProductSlider from "./ProductSlider";
import ProductDetails from "./ProductDetails";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [isLoading, setIsLoading] = useState(true);
  const [slideIndex, setSlideIndex] = useState(0);
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

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setTouchStartX(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    const diff = e.clientX - touchStartX;
    if (diff > 50) handlePrev();
    else if (diff < -50) handleNext();
  };

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
      <BackTo />

      <section className="bg-background body-font overflow-hidden min-h-[calc(100vh-4rem)] flex items-center">
        <div className="max-w-screen-xl mx-auto px-4 py-4 sm:px-6 sm:py-8 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            <div
              className="w-full lg:w-1/2 flex justify-center"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}>
              <ProductSlider
                image={product.image}
                name={product.name}
                slides={3}
              />
            </div>

            <div className="w-full lg:w-1/2 flex">
              <ProductDetails product={product} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductPage;
