import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ProductCard from "@/components/shop/ProductCard";
import type { Product } from "@/data/products";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface TopProductsProps {
  products: Product[];
}

const TopProducts: React.FC<TopProductsProps> = ({ products }) => {
  const topProducts = products.slice(0, 8);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  const handleNext = () => {
    if (currentIndex + itemsPerPage < topProducts.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const dragContainerRef = useRef<HTMLUListElement>(null);

  return (
    <section
      ref={ref}
      className="text-text-secondary bg-background body-font py-16">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4 text-center">
          Топовые товары
        </h2>
        <p className="text-center text-text-secondary max-w-2xl mx-auto mb-10">
          Мы собрали для вас самые популярные товары. Успейте приобрести, пока
          они в наличии!
        </p>

        <div className="flex items-center justify-center gap-4 relative">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-2 text-primary disabled:opacity-30 hover:scale-110 transition">
            <FaChevronLeft size={24} />
          </button>

          <motion.div className="cursor-grab active:cursor-grabbing overflow-hidden w-full">
            <motion.ul
              ref={dragContainerRef}
              className="flex gap-6 min-w-max"
              drag="x"
              dragConstraints={{ left: -1000, right: 0 }}
              dragElastic={0.1}
              dragMomentum={false}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={{
                visible: {
                  transition: { staggerChildren: 0.2, when: "beforeChildren" },
                },
              }}>
              {topProducts.map((product, index) => (
                <motion.li
                  key={product.slug}
                  className="min-w-[240px] cursor-pointer select-none"
                  variants={{
                    hidden: { opacity: 0, x: 100 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.5, delay: index * 0.2 },
                    },
                  }}>
                  <ProductCard
                    slug={product.slug}
                    name={product.name}
                    image={product.image}
                    price={product.price}
                  />
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <button
            onClick={handleNext}
            disabled={currentIndex + itemsPerPage >= topProducts.length}
            className="p-2 text-primary disabled:opacity-30 hover:scale-110 transition">
            <FaChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopProducts;
