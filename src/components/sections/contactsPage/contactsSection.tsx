// src/components/sections/ContactInfoSection.tsx

import React from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaVk,
  FaWhatsapp,
  FaPaperPlane,
} from "react-icons/fa";

const ContactInfoSection: React.FC = () => {
  return (
    <section className="text-text-primary bg-background py-24">
      <div className="max-w-[1245px] mx-auto px-4 text-center flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-primary">
          СВЯЖИТЕСЬ С НАМИ
        </h2>
        <p className="text-text-secondary max-w-3xl mb-8 leading-relaxed">
          Наша команда всегда готова помочь Вам 24/7. Если у Вас есть вопросы о
          продукции, заказах или сотрудничестве — свяжитесь с нами любым удобным
          способом! Мы гарантируем оперативность и внимательное отношение к
          деталям. Ценим доверие клиентов к нашей компании и предлагаем форматы
          общения для достижения совместного результата.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full max-w-md">
          <a
            href="mailto:orlov_brand_777@vk.com"
            className="flex items-center justify-center gap-3 bg-primary text-background py-3 px-6 rounded-lg hover:bg-[#e5d870] transition-colors duration-200 w-full">
            <FaEnvelope />
            orlov_brand_777@vk.com
          </a>
          <a
            href="tel:+79113322917"
            className="flex items-center justify-center gap-3 bg-primary text-background py-3 px-6 rounded-lg hover:bg-[#e5d870] transition-colors duration-200 w-full">
            <FaPhoneAlt />
            +7 (911) 332 29-17
          </a>
        </div>

        <div className="flex gap-6 mb-8 text-2xl justify-center">
          <a
            href="https://t.me/orlov_brand"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors duration-200">
            <FaPaperPlane />
          </a>
          <a
            href="https://vk.com/orlov_brand"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors duration-200">
            <FaVk />
          </a>
          <a
            href="https://wa.me/79113322917"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors duration-200">
            <FaWhatsapp />
          </a>
        </div>

        <p className="text-text-secondary text-sm">
          Orlov — Роскошь. Статус. Качество.
        </p>
      </div>
    </section>
  );
};

export default ContactInfoSection;
