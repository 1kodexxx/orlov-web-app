// src/components/sections/reviewsPage/TestimonialsSection.tsx

import React from "react";
import { motion } from "framer-motion";
import { testimonials } from "@/data/reviews";
import "swiper/css";
import "swiper/css/navigation";

const TestimonialsSection: React.FC = () => {
  return (
    <section className="w-full bg-background py-16 px-4 flex flex-col items-center">
      {/* ВЕРХНЯЯ СЕКЦИЯ */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[1245px] mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Почему выбирают нас?
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Узнайте, почему выбор Orlov Brand — лучшее решение для вас.
        </p>
      </motion.div>

      {/* БЛОКИ ПРЕИМУЩЕСТВ */}
      <div className="w-full max-w-[1244px] grid gap-6 sm:grid-cols-3 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-background-paper rounded-2xl shadow p-6 text-center flex flex-col items-center">
          <div className="text-4xl mb-4">🚚</div>
          <h3 className="font-semibold text-lg mb-2">
            Отслеживание заказов в реальном времени
          </h3>
          <p className="text-text-secondary mb-2">
            Узнайте, когда прибудет ваша покупка, или запланируйте доставку.
          </p>
          <a
            href="#"
            className="text-primary underline hover:no-underline mb-1">
            Отследить заказ →
          </a>
          <a href="#" className="text-primary underline hover:no-underline">
            Запланировать доставку →
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-background-paper rounded-2xl shadow p-6 text-center flex flex-col items-center">
          <div className="text-4xl mb-4">🛍️</div>
          <h3 className="font-semibold text-lg mb-2">Ваш личный маркетплейс</h3>
          <p className="text-text-secondary mb-2">
            Получайте бонусы за каждую покупку и доступ к эксклюзивным
            предложениям.
          </p>
          <a
            href="#"
            className="text-primary underline hover:no-underline mb-1">
            Подать заявку →
          </a>
          <a href="#" className="text-primary underline hover:no-underline">
            Управлять покупками →
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-background-paper rounded-2xl shadow p-6 text-center flex flex-col items-center">
          <div className="text-4xl mb-4">🎧</div>
          <h3 className="font-semibold text-lg mb-2">Премиальная поддержка</h3>
          <p className="text-text-secondary mb-2">
            Многоуровневая поддержка клиентов по всем вопросам и заказам.
          </p>
          <p className="text-text-secondary mb-1">📞 +7 (495) 123-45-67</p>
          <p className="text-text-secondary">📧 support@orlovbrand.ru</p>
        </motion.div>
      </div>

      {/* СПИСОК ОТЗЫВОВ */}
      <div className="w-full max-w-[1244px] grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mx-auto">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index < 6 ? 1 + index * 0.2 : 0.2,
            }}
            viewport={{ once: true }}
            className="bg-background-paper rounded-2xl shadow p-6 flex flex-col justify-between">
            <p className="mb-4 text-[#CCCCCC]">"{testimonial.text}"</p>
            <div className="flex items-center gap-4">
              <img
                src={testimonial.avatar}
                alt={testimonial.author}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-primary">
                  {testimonial.author}
                </p>
                <p className="text-sm text-text-secondary">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
