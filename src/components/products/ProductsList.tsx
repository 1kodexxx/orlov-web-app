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
        <ul className="mt-4 grid gap-y-10 gap-x-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {currentProducts.map((product) => (
            <li key={product.id} className="flex flex-col">
              <a
                href="#"
                className="group flex flex-col h-full overflow-hidden rounded-2xl shadow-lg bg-background-paper transition-transform duration-300 hover:scale-[1.02]">
                <div className="w-full aspect-[3/4] max-h-[450px] overflow-hidden flex items-center justify-center bg-background-paper">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="mt-auto p-4">
                  <h3 className="text-sm text-text-secondary group-hover:underline truncate">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-base font-semibold text-text-primary">
                    {product.price}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>

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
