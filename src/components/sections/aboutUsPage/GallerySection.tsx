// src/components/layout/navBar/GallerySection.tsx

import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

interface GallerySectionProps {
  title: string;
  description: string;
  images?: string[]; // опционально
}

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren",
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const hoverEffect = {
  whileHover: { scale: 1.05, transition: { duration: 0.3 } },
};

const GallerySection: React.FC<GallerySectionProps> = ({
  title,
  description,
  images = [],
}) => {
  if (images.length < 6) {
    return (
      <section className="w-full min-h-screen flex items-center justify-center bg-background py-16 px-4">
        <motion.p
          className="text-primary text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}>
          Галерея загружается...
        </motion.p>
      </section>
    );
  }

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="w-full min-h-screen flex flex-col items-center bg-background py-16 px-4">
      <motion.div
        variants={textVariants}
        className="w-full max-w-[1245px] mx-auto flex flex-col gap-8">
        <div className="text-center space-y-6">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-primary mb-4"
            variants={textVariants}>
            {title}
          </motion.h2>
          <motion.p
            className="text-lg text-text-secondary max-w-2xl mx-auto mb-12"
            variants={textVariants}>
            {description}
          </motion.p>
        </div>

        <motion.div
          className="flex flex-wrap -m-1 md:-m-2"
          variants={containerVariants}>
          <div className="flex flex-wrap w-full md:w-1/2">
            <motion.div
              className="p-1 md:p-2 w-1/2"
              variants={itemVariants}
              whileHover={hoverEffect.whileHover}>
              <motion.img
                src={images[0]}
                alt="Галерея"
                className="w-full h-full object-cover object-center block rounded-lg"
              />
            </motion.div>

            <motion.div
              className="p-1 md:p-2 w-1/2"
              variants={itemVariants}
              whileHover={hoverEffect.whileHover}>
              <motion.img
                src={images[1]}
                alt="Галерея"
                className="w-full h-full object-cover object-center block rounded-lg"
              />
            </motion.div>

            <motion.div
              className="p-1 md:p-2 w-full"
              variants={itemVariants}
              whileHover={hoverEffect.whileHover}>
              <motion.img
                src={images[2]}
                alt="Галерея"
                className="w-full h-full object-cover object-center block rounded-lg"
              />
            </motion.div>
          </div>

          <div className="flex flex-wrap w-full md:w-1/2">
            <motion.div
              className="p-1 md:p-2 w-full"
              variants={itemVariants}
              whileHover={hoverEffect.whileHover}>
              <motion.img
                src={images[3]}
                alt="Галерея"
                className="w-full h-full object-cover object-center block rounded-lg"
              />
            </motion.div>

            <motion.div
              className="p-1 md:p-2 w-1/2"
              variants={itemVariants}
              whileHover={hoverEffect.whileHover}>
              <motion.img
                src={images[4]}
                alt="Галерея"
                className="w-full h-full object-cover object-center block rounded-lg"
              />
            </motion.div>

            <motion.div
              className="p-1 md:p-2 w-1/2"
              variants={itemVariants}
              whileHover={hoverEffect.whileHover}>
              <motion.img
                src={images[5]}
                alt="Галерея"
                className="w-full h-full object-cover object-center block rounded-lg"
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default GallerySection;
