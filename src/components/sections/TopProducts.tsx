import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCard from "@/components/shop/ProductCard";
import type { Product } from "@/data/products";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

interface TopProductsProps {
  products: Product[];
}

const TopProducts: React.FC<TopProductsProps> = ({ products }) => {
  const topProducts = products.slice(0, 12);
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="text-text-secondary bg-background body-font py-16">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4 text-center">
          Топовые товары
        </h2>
        <p className="text-center text-text-secondary max-w-2xl mx-auto mb-10">
          Мы собрали для вас самые популярные товары. Успейте приобрести, пока
          они в наличии!
        </p>

        <div className="relative">
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

          {/* Swiper слайдер */}
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[FreeMode, Navigation]}
            spaceBetween={24}
            freeMode={true}
            slidesPerView={"auto"}
            grabCursor={true}
            className="px-4">
            {topProducts.map((product) => (
              <SwiperSlide
                key={product.slug}
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
    </section>
  );
};

export default TopProducts;
