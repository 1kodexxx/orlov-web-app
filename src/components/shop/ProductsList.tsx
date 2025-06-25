import React, { useState } from "react";
import ProductCard from "./ProductCard";
import type { Product } from "@/data/products";

interface ProductsListProps {
  products: Product[]; // 🔥 Важно — передаём отфильтрованные товары сюда
  itemsPerPage?: number;
}

const ProductsList: React.FC<ProductsListProps> = ({
  products,
  itemsPerPage = 12, // 3 ряда по 4 карточки
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="text-text-secondary bg-background body-font py-0">
      <div className="max-w-screen-xl mx-auto px-4 pb-32">
        {currentProducts.length > 0 ? (
          <ul className="mt-4 grid gap-y-10 gap-x-[68.5px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {currentProducts.map((product: Product) => (
              <ProductCard
                key={product.slug}
                slug={product.slug}
                name={product.name}
                image={product.image}
                price={product.price}
              />
            ))}
          </ul>
        ) : (
          <div className="mt-10 text-center text-lg text-text-secondary">
            Ничего не найдено
          </div>
        )}

        <ol className="mt-8 flex justify-center gap-2 text-xs font-medium">
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-secondary hover:bg-secondary hover:text-background transition disabled:opacity-50">
              ‹
            </button>
          </li>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li key={page}>
              <button
                onClick={() => handlePageChange(page)}
                className={`inline-flex h-8 w-8 items-center justify-center rounded-sm border ${
                  page === currentPage
                    ? "bg-[#EFE393] text-black border-[#EFE393]"
                    : "border-secondary hover:bg-secondary hover:text-background transition"
                }`}>
                {page}
              </button>
            </li>
          ))}

          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-secondary hover:bg-secondary hover:text-background transition disabled:opacity-50">
              ›
            </button>
          </li>
        </ol>
      </div>
    </section>
  );
};

export default ProductsList;
