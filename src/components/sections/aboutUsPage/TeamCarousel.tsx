import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaTelegramPlane } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import { nbspShort } from "@/utils/nbspShort";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
  telegram?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Иван Орлов",
    role: "Генеральный директор",
    description:
      "Иван определяет стратегию Orlov Brand и ведёт команду к большим целям.",
    image: "/ivan_carousel.jpg",
    telegram: "https://t.me/ORLANDE_777",
  },
  {
    name: "Александр",
    role: "Главный разработчик",
    description:
      "Александр строит платформу на принципах надёжности, скорости и технологического совершенства.",
    image: "/sasha_carousel.jpg",
    telegram: "https://t.me/pvntheraxxx",
  },
  {
    name: "Виктория Мешкова",
    role: "PR-специалист",
    description:
      "Виктория формирует имидж бренда, развивает коммуникации и продвигает ценности Orlov.",
    image: "/vika_carousel.jpg",
    telegram: "https://t.me/viiikaa51",
  },
];

const TeamCarousel: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="w-full flex flex-col items-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      {/* Заголовок */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-3xl md:text-4xl font-bold text-primary mb-4 text-center">
        {nbspShort("Наша команда")}
      </motion.h2>

      {/* Подзаголовок */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-base text-text-secondary max-w-2xl text-center mb-12">
        {nbspShort(
          "Люди Orlov Brand: профессионалы с энергией, стилем и гордостью."
        )}
      </motion.p>

      {/* Мобильная версия — простой список */}
      <div className="block sm:hidden flex flex-col items-center gap-8">
        {teamMembers.map((member, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-card-bg rounded-2xl p-6 flex flex-col items-center text-center shadow-lg w-full max-w-xs">
            {/* Контейнер с соотношением сторон 3:4 */}
            <div className="w-full relative pb-[133.33%] rounded-xl overflow-hidden mb-4 bg-gray-800">
              <img
                src={member.image}
                alt={member.name}
                className="absolute top-0 left-0 w-full h-full object-contain"
              />
            </div>
            <h3 className="text-white font-semibold text-lg mb-1">
              {member.name}
            </h3>
            <p className="text-primary text-sm mb-2">{member.role}</p>
            <p className="text-text-secondary text-sm mb-4">
              {member.description}
            </p>
            {member.telegram && (
              <a
                href={member.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary transition-colors">
                <FaTelegramPlane size={20} />
              </a>
            )}
          </motion.div>
        ))}
      </div>

      {/* Десктоп — Swiper-карусель */}
      <div className="hidden sm:block relative w-full max-w-screen-lg">
        {/* Стрелки */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 text-primary hover:scale-110 transition">
          <FaChevronLeft size={24} />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 text-primary hover:scale-110 transition">
          <FaChevronRight size={24} />
        </button>

        <Swiper
          onSwiper={(s) => (swiperRef.current = s)}
          modules={[Navigation, Autoplay]}
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          speed={700}
          grabCursor
          spaceBetween={40}
          slidesPerView={1.2}
          breakpoints={{
            768: { slidesPerView: 1.5, spaceBetween: 48 },
            1024: { slidesPerView: 2.2, spaceBetween: 56 },
          }}>
          {teamMembers.map((member, idx) => (
            <SwiperSlide key={idx} className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-card-bg rounded-2xl p-6 flex flex-col items-center text-center shadow-lg max-w-sm">
                <div className="w-full relative pb-[130%] rounded-xl overflow-hidden mb-4 bg-gray-800">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute top-0 left-0 w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-white font-semibold text-lg mb-1">
                  {member.name}
                </h3>
                <p className="text-primary text-sm mb-2">{member.role}</p>
                <p className="text-text-secondary text-sm mb-4">
                  {member.description}
                </p>
                {member.telegram && (
                  <a
                    href={member.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-primary transition-colors">
                    <FaTelegramPlane size={20} />
                  </a>
                )}
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TeamCarousel;
