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
    <section className="w-full min-h-screen flex flex-col items-center justify-center bg-background py-16 px-4">
      <div className="w-full max-w-screen-xl flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4 text-center">
          Коллекция премиальных чехлов
        </h2>
        <p className="text-center text-text-secondary max-w-2xl mb-10">
          Оцените изысканный дизайн и превосходное качество наших топовых
          моделей. Элитные чехлы для тех, кто выбирает стиль и надёжность.
        </p>

        <div className="relative w-full flex items-center">
          {/* Навигационные кнопки */}
          <div className="absolute -left-6 top-1/2 -translate-y-1/2 z-10">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="p-2 text-primary hover:scale-110 transition">
              <FaChevronLeft size={24} />
            </button>
          </div>

          <div className="absolute -right-6 top-1/2 -translate-y-1/2 z-10">
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="p-2 text-primary hover:scale-110 transition">
              <FaChevronRight size={24} />
            </button>
          </div>

          {/* Бесконечный автопрокручивающийся слайдер */}
          <div className="w-full px-4">
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              modules={[FreeMode, Navigation, Autoplay]}
              spaceBetween={24}
              freeMode={true}
              slidesPerView={"auto"}
              grabCursor={true}
              loop={true}
              speed={5000}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
              }}>
              {topProducts.map((product, index) => (
                <SwiperSlide
                  key={product.slug + index}
                  className="!w-[240px] cursor-pointer select-none">
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
