import React from "react";
import { motion } from "framer-motion";
import { testimonials } from "@/data/reviews";
import type { Variants } from "framer-motion";

// Анимации
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const testimonialContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.5 } },
};

const testimonialItem: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const TestimonialsSection: React.FC = () => {
  return (
    <motion.section
      className="w-full bg-background py-16 px-4 flex flex-col items-center"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}>
      {/* Заголовок */}
      <div className="w-full max-w-[1245px] mx-auto text-center mb-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-primary mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}>
          Почему выбирают нас?
        </motion.h2>
        <motion.p
          className="text-text-secondary max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}>
          Узнайте, почему выбор Orlov Brand — лучшее решение для вас.
        </motion.p>
      </div>

      {/* Отзывы */}
      <motion.div
        className="w-full max-w-[1244px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8"
        variants={testimonialContainer}
        initial="hidden"
        animate="visible">
        {testimonials.map((t, idx) => (
          <motion.div
            key={idx}
            className="bg-background-paper rounded-2xl shadow p-6 flex flex-col justify-between h-full"
            variants={testimonialItem}>
            <p className="mb-4 text-gray-300">“{t.text}”</p>
            <div className="flex items-center gap-4 mt-auto">
              <img
                src={t.avatar}
                alt={t.author}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-white">{t.author}</p>
                <p className="text-sm text-text-secondary">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default TestimonialsSection;
