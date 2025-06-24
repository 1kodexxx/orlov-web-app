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
  itemsPerPage = 4,
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
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {currentProducts.map((product) => (
            <li key={product.id}>
              <a href="#" className="group block overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                />
                <div className="relative bg-background-paper pt-3">
                  <h3 className="text-xs text-text-secondary group-hover:underline group-hover:underline-offset-4">
                    {product.name}
                  </h3>
                  <p className="mt-2">
                    <span className="sr-only">Цена</span>
                    <span className="tracking-wider text-text-primary">
                      {product.price}
                    </span>
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
              className="inline-flex size-8 items-center justify-center rounded-sm border border-secondary hover:bg-secondary hover:text-background transition"
              disabled={currentPage === 1}>
              <span className="sr-only">Предыдущая страница</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <li key={page}>
                <button
                  onClick={() => handlePageChange(page)}
                  className={`block size-8 rounded-sm border text-center leading-8 ${
                    page === currentPage
                      ? "bg-primary text-background border-primary"
                      : "border-secondary hover:bg-secondary hover:text-background transition"
                  }`}>
                  {page}
                </button>
              </li>
            )
          )}

          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="inline-flex size-8 items-center justify-center rounded-sm border border-secondary hover:bg-secondary hover:text-background transition"
              disabled={currentPage === totalPages}>
              <span className="sr-only">Следующая страница</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>
        </ol>
      </div>
    </section>
  );
};

export default ProductsList;
