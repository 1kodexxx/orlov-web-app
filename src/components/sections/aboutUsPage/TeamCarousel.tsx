import React from "react";
import { FaTelegramPlane } from "react-icons/fa";
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
    name: "Иван",
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
    name: "Виктория",
    role: "PR-специалист",
    description:
      "Виктория формирует имидж бренда, развивает коммуникации и продвигает ценности Orlov.",
    image: "/vika_carousel.jpg",
    telegram: "https://t.me/viiikaa51",
  },
];

const TeamCards: React.FC = () => {
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

      {/* Карточки команды */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-screen-lg">
        {teamMembers.map((member, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-card-bg rounded-2xl p-6 flex flex-col items-center text-center shadow-lg">
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
    </section>
  );
};

export default TeamCards;
