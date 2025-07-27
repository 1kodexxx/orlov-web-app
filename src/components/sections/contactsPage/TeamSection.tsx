import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { FaTelegramPlane } from "react-icons/fa";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
  telegram: string;
}

const team: TeamMember[] = [
  {
    name: "Иван",
    role: "Генеральный директор",
    description:
      "Иван определяет стратегию Orlov Brand и уверенно ведёт команду к достижению больших целей.",
    image: "/ivan_avatar.jpg",
    telegram: "https://t.me/ORLANDE_777",
  },
  {
    name: "Александр",
    role: "Главный разработчик",
    description:
      "Александр строит платформу Orlov Brand на принципах надёжности, скорости и технологического совершенства.",
    image: "/sasha_avatar.jpg",
    telegram: "https://t.me/pvntheraxxx",
  },
  {
    name: "Виктория",
    role: "PR-специалист",
    description:
      "Виктория формирует имидж Orlov Brand в глазах общественности, развивает коммуникации и доносит ценности бренда миру.",
    image: "/vika_avatar.jpg",
    telegram: "https://t.me/viiikaa51",
  },
];

// Контейнер: плавный ритм появления
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

// Элементы: плавное появление через scale + opacity
const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const TeamSimpleSection: React.FC = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="w-full min-h-screen bg-background py-16 px-4 flex items-center justify-center">
      <div className="max-w-[1245px] mx-auto flex flex-col lg:flex-row lg:items-start gap-12">
        {/* Левая колонка */}
        <motion.div
          variants={cardVariants}
          className="lg:w-1/2 flex flex-col justify-center space-y-6">
          <h2 className="text-4xl font-extrabold text-primary mb-4 select-none">
            Наши люди — наше величие
          </h2>
          <p className="text-text-secondary select-none">
            В ORLOV мы создаём продукты, в которых сочетаются технологии,
            культура и премиальное качество.
          </p>
          <p className="text-text-secondary select-none">
            Работая с нами, вы встречаете профессионалов, решаете нестандартные
            задачи и находите единомышленников.
          </p>
        </motion.div>

        {/* Правая колонка */}
        <motion.div
          variants={containerVariants}
          className="lg:w-1/2 flex flex-col gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-6 border-b border-border pb-6 select-none">
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 object-cover rounded-full pointer-events-none"
              />
              <div>
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="text-primary mb-2">{member.role}</p>
                <p className="text-text-secondary mb-4">{member.description}</p>
                <div className="flex gap-4">
                  <a
                    href={member.telegram}
                    className="text-text-secondary hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer">
                    <FaTelegramPlane size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TeamSimpleSection;
