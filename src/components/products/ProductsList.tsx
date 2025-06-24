import React, { useState } from "react";

interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
}

interface ProductsListProps {
  products: Product[];
  itemsPerPage?: number;
}

const ProductsList: React.FC<ProductsListProps> = ({
  products,
  itemsPerPage = 4, // возвращаем 4 товара на страницу
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
    <section className="text-text-secondary bg-background body-font py-4">
      <div className="max-w-screen-xl mx-auto px-4">
        <ul
          className="
            mt-4 grid gap-4
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4   /* 4 карточки в ряду на больших экранах */
            auto-rows-fr     /* ровные строки */
          ">
          {currentProducts.map((product) => (
            <li key={product.id} className="flex flex-col">
              <a
                href="#"
                className="group flex flex-col h-full overflow-hidden rounded-sm">
                {/* контейнер с фиксированным соотношением */}
                <div className="w-full aspect-[4/5] bg-background-paper p-4 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain transition duration-500 group-hover:scale-105"
                  />
                </div>

                {/* текст внизу */}
                <div className="mt-auto bg-background-paper p-3">
                  <h3 className="text-xs text-text-secondary group-hover:underline truncate">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-text-primary">
                    {product.price}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        <ol className="mt-6 flex justify-center gap-1 text-xs font-medium">
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-secondary hover:bg-secondary hover:text-background transition">
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
              className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-secondary hover:bg-secondary hover:text-background transition">
              ›
            </button>
          </li>
        </ol>
      </div>
    </section>
  );
};

export default ProductsList;
