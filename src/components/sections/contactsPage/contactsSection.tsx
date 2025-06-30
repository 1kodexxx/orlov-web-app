// src/components/sections/ContactFormSection.tsx

import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

// Контейнер для анимации с потомками
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

// Отдельные элементы анимации
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const ContactFormSection: React.FC = () => {
  return (
    <section className="w-full min-h-screen bg-background pt-4 md:pt-8 lg:pt-0 pb-12 px-4 flex items-center justify-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-[1245px] mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-12 items-start md:items-center">
        {/* Левая колонка — Форма */}
        <div className="md:col-span-2 space-y-6">
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold text-primary text-center md:text-left">
            Свяжитесь с нами
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-text-secondary text-center md:text-left">
            Наша команда всегда готова помочь Вам 24/7. Если у Вас есть вопросы
            о продукции, заказах или сотрудничестве – свяжитесь с нами любым
            удобным способом! Мы гарантируем оперативность и внимательное
            отношение к деталям. Ценим доверие клиентов к нашей компании и
            предлагаем форматы общения для достижения совместного результата.
          </motion.p>

          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["Ваше имя", "Ваша фамилия"].map((label, idx) => (
                <motion.div key={idx} variants={itemVariants}>
                  <label className="block mb-2 text-sm font-medium text-text-secondary">
                    {label}
                  </label>
                  <input
                    type="text"
                    placeholder={label}
                    className="w-full border border-[#e5d870] p-3 rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-[#e5d870]"
                    required
                  />
                </motion.div>
              ))}

              <motion.div variants={itemVariants}>
                <label className="block mb-2 text-sm font-medium text-text-secondary">
                  Ваш email
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full border border-[#e5d870] p-3 rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-[#e5d870]"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block mb-2 text-sm font-medium text-text-secondary">
                  Ваш телефон
                </label>
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  className="w-full border border-[#e5d870] p-3 rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-[#e5d870]"
                  required
                />
              </motion.div>
            </div>

            <motion.div variants={itemVariants}>
              <label className="block mb-2 text-sm font-medium text-text-secondary">
                Ваше сообщение
              </label>
              <textarea
                placeholder="Введите сообщение..."
                className="w-full h-16 border border-[#e5d870] p-3 rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-[#e5d870]"
                rows={6}
                required
              />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-xs text-text-secondary">
              Отправляя эту форму, вы соглашаетесь с{" "}
              <a href="#" className="text-primary hover:underline">
                Условиями обслуживания
              </a>{" "}
              и{" "}
              <a href="#" className="text-primary hover:underline">
                Политикой конфиденциальности
              </a>
              .
            </motion.p>

            <motion.button
              variants={itemVariants}
              type="submit"
              className="bg-primary text-background py-3 px-6 rounded-lg hover:bg-[#e5d870] transition-colors duration-200">
              Отправить сообщение
            </motion.button>
          </form>
        </div>

        {/* Правая колонка — Контакты */}
        <div className="space-y-8">
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-primary mb-2">
              Информация о компании:
            </h4>
            <p className="text-[#ccc]">Orlov Brand</p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-primary mb-2">Адрес:</h4>
            <p className="text-[#ccc]">
              Россия, г. Москва, <br />
              ул. Мнёвники, дом 5
            </p>
            <p className="text-[#ccc]">Почтовый индекс: 123308</p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-primary mb-2">Позвоните нам:</h4>
            <p className="text-[#ccc] mb-1">Мы всегда готовы помочь вам.</p>
            <a
              href="tel:+7-911-332-29-17"
              className="text-primary hover:underline">
              +7 (911) 332-29-17
            </a>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-primary mb-2">
              Почта для связи:
            </h4>
            <a
              href="mailto:orlov_brand_777@vk.com"
              className="text-[#ccc] hover:underline">
              orlov_brand_777@vk.com
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactFormSection;
