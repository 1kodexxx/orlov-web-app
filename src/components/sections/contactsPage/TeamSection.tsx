import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
  socials: {
    facebook?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
}

const team: TeamMember[] = [
  {
    name: "Иван",
    role: "Генеральный директор",
    description:
      "Иван определяет стратегию Orlov Brand и уверенно ведёт команду к достижению больших целей.",
    image:
      "https://sun9-8.userapi.com/s/v1/if2/PlDstXaHzHTFd40s7ZeMo5wtEMWo_iVdZL4w30YdSc7fvLWTlKqXceA_TPT9GrIKrdNfDrStzsw6fTiCh6r42djO.jpg?quality=95&as=32x21,48x32,72x48,108x72,160x107,240x160,360x240,480x320,540x360,640x427,720x480,1080x720,1170x780&from=bu&cs=1170x0",
    socials: { facebook: "#", twitter: "#", github: "#", website: "#" },
  },
  {
    name: "Александр",
    role: "Разработчик",
    description:
      "Александр строит платформу Orlov Brand на принципах надёжности, скорости и технологического совершенства.",
    image:
      "https://sun6-20.userapi.com/s/v1/ig2/Y3TBz7eZ0YacYJ5JEwCi5lcGmRsmGj7pm5A1WVvbOxfn7SI9SEy2WSrjjl3BeiglFTOvvbj4l6ZtJsYg8SJd1oYY.jpg?quality=95&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080&from=bu&cs=1080x0",
    socials: { facebook: "#", twitter: "#", github: "#", website: "#" },
  },
];

// Контейнер анимации: заставляем потомков появляться последовательно
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Появление элементов: из прозрачного состояния смещаются вверх
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const TeamSimpleSection: React.FC = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="bg-background py-16 px-4">
      <div className="max-w-[1245px] mx-auto flex flex-col lg:flex-row lg:items-stretch gap-12 h-full">
        {/* Левая колонка */}
        <div className="lg:w-1/2 flex flex-col justify-center h-full space-y-6">
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-extrabold text-white mb-4">
            Наши люди — наше величие
          </motion.h2>
          <motion.p variants={itemVariants} className="text-text-secondary">
            В ORLOV мы создаём продукты, в которых сочетаются технологии,
            культура и премиальное качество.
          </motion.p>
          <motion.p variants={itemVariants} className="text-text-secondary">
            Работая с нами, вы встречаете профессионалов, решаете нестандартные
            задачи и находите единомышленников. Мы верим, что именно люди делают
            бренд великим.
          </motion.p>
        </div>

        {/* Правая колонка */}
        <div className="lg:w-1/2 flex flex-col gap-8 justify-between h-full">
          {team.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex items-center gap-6 border-b border-border pb-6">
              <motion.img
                variants={itemVariants}
                src={member.image}
                alt={member.name}
                className="w-24 h-24 object-cover rounded-full"
              />
              <div>
                <motion.h3
                  variants={itemVariants}
                  className="text-xl font-bold text-white">
                  {member.name}
                </motion.h3>
                <motion.p
                  variants={itemVariants}
                  className="text-text-secondary mb-2">
                  {member.role}
                </motion.p>
                <motion.p
                  variants={itemVariants}
                  className="text-text-secondary mb-4">
                  {member.description}
                </motion.p>
                <motion.div variants={itemVariants} className="flex gap-4">
                  {member.socials.facebook && (
                    <a
                      href={member.socials.facebook}
                      className="text-text-secondary hover:text-white">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  )}
                  {member.socials.twitter && (
                    <a
                      href={member.socials.twitter}
                      className="text-text-secondary hover:text-white">
                      <i className="fab fa-twitter"></i>
                    </a>
                  )}
                  {member.socials.github && (
                    <a
                      href={member.socials.github}
                      className="text-text-secondary hover:text-white">
                      <i className="fab fa-github"></i>
                    </a>
                  )}
                  {member.socials.website && (
                    <a
                      href={member.socials.website}
                      className="text-text-secondary hover:text-white">
                      <i className="fas fa-globe"></i>
                    </a>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TeamSimpleSection;
