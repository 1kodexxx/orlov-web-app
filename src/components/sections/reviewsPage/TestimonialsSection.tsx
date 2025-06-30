// src/components/sections/reviewsPage/TestimonialsSection.tsx

import React from "react";
import { testimonials } from "@/data/reviews";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

// Анимации
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.2, duration: 0.8, ease: "easeOut" },
  }),
};

const fastFadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.4, ease: "easeOut" },
  }),
};

const TestimonialsSection: React.FC = () => {
  return (
    <section className="w-full bg-background py-16 px-4 flex flex-col items-center">
      {/* ВЕРХНЯЯ СЕКЦИЯ */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
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
        {[
          {
            icon: "🚚",
            title: "Отслеживание заказов в реальном времени",
            description:
              "Узнайте, когда прибудет ваша покупка, или запланируйте доставку.",
            links: [
              { label: "Отследить заказ →", href: "#" },
              { label: "Запланировать доставку →", href: "#" },
            ],
          },
          {
            icon: "🛍️",
            title: "Ваш личный маркетплейс",
            description:
              "Получайте бонусы за каждую покупку и доступ к эксклюзивным предложениям.",
            links: [
              { label: "Подать заявку →", href: "#" },
              { label: "Управлять покупками →", href: "#" },
            ],
          },
          {
            icon: "🎧",
            title: "Премиальная поддержка",
            description:
              "Многоуровневая поддержка клиентов по всем вопросам и заказам.",
            contacts: ["📞 +7 (495) 123-45-67", "📧 support@orlovbrand.ru"],
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-background-paper rounded-2xl shadow p-6 text-center flex flex-col items-center">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
            <p className="text-text-secondary mb-2">{feature.description}</p>
            {feature.links &&
              feature.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="text-primary underline hover:no-underline mb-1">
                  {link.label}
                </a>
              ))}
            {feature.contacts &&
              feature.contacts.map((contact, idx) => (
                <p key={idx} className="text-text-secondary mb-1">
                  {contact}
                </p>
              ))}
          </motion.div>
        ))}
      </div>

      {/* СПИСОК ОТЗЫВОВ */}
      <div className="w-full max-w-[1244px] grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mx-auto">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fastFadeIn}
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
