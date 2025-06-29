// src/components/sections/TestimonialsSection.tsx

import React from "react";
import { motion } from "framer-motion";

interface Testimonial {
  text: string;
  author: string;
  role: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    text: "ORLOV made in RUSSIA — это больше, чем бренд. Это культурный код, который я с гордостью транслирую своим клиентам и партнёрам. Продукция безупречного качества и с глубоким смыслом.",
    author: "Александр Петров",
    role: "Генеральный директор Prestige Consulting",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    text: "Мы заказали эксклюзивные аксессуары для официальной делегации. Качество, внимание к деталям и уважение к традициям превзошли ожидания. ORLOV — это образец государственного стиля.",
    author: "Ольга Смирнова",
    role: "Сотрудник государственной структуры",
    avatar: "https://randomuser.me/api/portraits/women/26.jpg",
  },
  {
    text: "Меня поразила философия бренда ORLOV. Это не просто изделия — это осознанный выбор в пользу российской идентичности и высокого вкуса.",
    author: "Сергей Волков",
    role: "Предприниматель и общественный деятель",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    text: "Как студентка, я нашла в ORLOV уникальный баланс доступности и премиальности. Носить такие аксессуары — значит быть частью истории и культуры своей страны.",
    author: "Анастасия Кузнецова",
    role: "Студентка МГУ",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    text: "Я долго искал подарки с характером и глубокой идеей. ORLOV made in RUSSIA создает именно такие изделия — изысканные, наполненные смыслом, и идеально выполненные.",
    author: "Виктор Михайлов",
    role: "Дипломат",
    avatar: "https://randomuser.me/api/portraits/men/18.jpg",
  },
  {
    text: "ORLOV — это выбор тех, кто ценит аутентичность и безупречный стиль. Как иностранный партнёр, я с гордостью использую аксессуары этого бренда.",
    author: "Томас Беккер",
    role: "Бизнес-партнёр из Германии",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    text: "Продукция ORLOV — это не просто аксессуары, это знаки уважения к культуре и истории. Команда бренда тонко чувствует, как воплотить традиции в современном дизайне.",
    author: "Дмитрий Иванов",
    role: "Креативный директор Национального культурного фонда",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
  },
  {
    text: "Каждое изделие ORLOV — это история, которую хочется рассказывать. Бренд достойно представляет российское наследие и высокое качество на международном уровне.",
    author: "Елена Морозова",
    role: "Руководитель департамента федерального агентства",
    avatar: "https://randomuser.me/api/portraits/women/30.jpg",
  },
  {
    text: "Высокое качество исполнения, элегантный дизайн и ценности бренда полностью соответствуют моему мировоззрению. ORLOV стал для меня выбором №1 для личных и деловых подарков.",
    author: "Павел Сидоров",
    role: "Частный инвестор",
    avatar: "https://randomuser.me/api/portraits/men/43.jpg",
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="w-full bg-background py-16 px-4 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[1245px] mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Отзывы о нас
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Мнения наших клиентов, которые ценят культуру, традиции и безупречный
          стиль ORLOV made in RUSSIA.
        </p>
      </motion.div>

      <div className="w-full max-w-[1244px] grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mx-auto">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
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
