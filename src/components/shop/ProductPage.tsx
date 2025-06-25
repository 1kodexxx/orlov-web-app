// src/pages/ProductPage.tsx
import React from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "@/components/common/Breadcrumb";
import { allProducts, type Product } from "@/data/products";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
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
      {/* Breadcrumb с заменой последнего элемента на русское название товара */}
      <Breadcrumb lastLabel={product.name} />

      <section className="text-text-secondary bg-background body-font overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-4 py-24">
          <div className="flex flex-wrap lg:w-4/5 mx-auto">
            <img
              alt={product.name}
              src={product.image}
              className="w-full h-64 object-cover object-center rounded bg-background-paper lg:w-1/2 lg:h-auto"
            />
            <div className="w-full lg:w-1/2 lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm font-medium text-text-secondary tracking-widest uppercase">
                ORLOV BRAND
              </h2>
              <h1 className="text-3xl font-semibold text-text-primary mb-2">
                {product.name}
              </h1>

              <div className="flex items-center mb-4">
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
                  <span className="ml-2 text-text-secondary">
                    {product.reviewsCount ?? 0} Reviews
                  </span>
                </span>

                <span className="flex ml-4 pl-4 py-2 border-l border-secondary space-x-3">
                  <a
                    href="#"
                    className="text-text-secondary hover:text-primary">
                    {/* Facebook */}
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      className="w-5 h-5">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-text-secondary hover:text-primary">
                    {/* Twitter */}
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      className="w-5 h-5">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7.5v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-text-secondary hover:text-primary">
                    {/* Instagram */}
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      className="w-5 h-5">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                    </svg>
                  </a>
                </span>
              </div>

              <p className="leading-relaxed text-text-secondary mb-6">
                {product.description || "Описание товара отсутствует."}
              </p>

              <div className="flex items-center pb-5 border-b border-secondary mb-5">
                <div className="flex items-center">
                  <span className="mr-3 text-text-secondary">Color</span>
                  <button className="w-6 h-6 border-2 border-secondary rounded-full focus:outline-none"></button>
                  <button className="w-6 h-6 ml-1 bg-background-paper border-2 border-secondary rounded-full focus:outline-none"></button>
                  <button className="w-6 h-6 ml-1 bg-secondary border-2 border-secondary rounded-full focus:outline-none"></button>
                </div>

                <div className="flex items-center ml-6">
                  <span className="mr-3 text-text-secondary">Size</span>
                  <div className="relative">
                    <select className="block appearance-none bg-background-paper border border-secondary py-2 pl-3 pr-10 rounded focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-text-secondary">
                      <option>SM</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        className="w-4 h-4 text-text-secondary">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <span className="text-2xl font-medium text-text-primary">
                  {product.price.toLocaleString()} ₽
                </span>
                <button className="ml-auto bg-secondary text-background py-2 px-6 rounded hover:bg-primary transition">
                  В корзину
                </button>
                <button className="ml-4 w-10 h-10 bg-background-paper rounded-full flex items-center justify-center text-text-secondary hover:text-primary transition">
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
      </section>
    </>
  );
};

export default ProductPage;
