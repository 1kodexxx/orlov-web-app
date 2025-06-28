import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCard from "@/components/shop/ProductCard";
import type { Product } from "@/data/products";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

interface TopProductsProps {
  products: Product[];
}

const TopProducts: React.FC<TopProductsProps> = ({ products }) => {
  const topProducts = products.slice(0, 12);
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="w-full min-h-auto sm:min-h-screen flex flex-col items-center justify-center bg-background py-12 sm:py-16 px-2 sm:px-4">
      <div className="w-full max-w-screen-xl flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 text-center">
          Коллекция премиальных чехлов
        </h2>
        <p className="text-center text-text-secondary max-w-lg sm:max-w-2xl mb-8 sm:mb-10 px-2">
          Оцените изысканный дизайн и превосходное качество наших топовых
          моделей. Элитные чехлы для тех, кто выбирает стиль и надёжность.
        </p>

        <div className="relative w-full flex items-center">
          {/* Навигационные кнопки */}
          <div className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-10">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="p-2 text-primary hover:scale-110 transition">
              <FaChevronLeft size={20} />
            </button>
          </div>

          <div className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-10">
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="p-2 text-primary hover:scale-110 transition">
              <FaChevronRight size={20} />
            </button>
          </div>

          {/* Адаптивный автопрокручивающийся слайдер */}
          <div className="w-full px-2 sm:px-4">
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              modules={[FreeMode, Navigation, Autoplay]}
              loop={true}
              speed={5000}
              freeMode={true}
              autoplay={{ delay: 0, disableOnInteraction: false }}
              breakpoints={{
                320: { slidesPerView: 1.2, spaceBetween: 16 },
                640: { slidesPerView: 2.5, spaceBetween: 20 },
                768: { slidesPerView: 3.5, spaceBetween: 24 },
                1024: { slidesPerView: 5, spaceBetween: 24 },
                1280: { slidesPerView: "auto", spaceBetween: 24 },
              }}
              grabCursor={true}
              style={{ height: "auto" }}>
              {topProducts.map((product, index) => (
                <SwiperSlide
                  key={`${product.slug}-${index}`}
                  className="!w-[160px] sm:!w-[200px] md:!w-[240px] h-auto cursor-pointer select-none">
                  <ProductCard
                    slug={product.slug}
                    name={product.name}
                    image={product.image}
                    price={product.price}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopProducts;
