// src/components/GallerySection.tsx

import React from "react";
import { motion } from "framer-motion";

interface GallerySectionProps {
  title: string;
  description: string;
  images?: string[]; // опционально
}

const GallerySection: React.FC<GallerySectionProps> = ({
  title,
  description,
  images = [], // значение по умолчанию
}) => {
  if (images.length < 6) {
    return (
      <section className="w-full min-h-screen flex items-center justify-center bg-background py-16 px-4">
        <p className="text-primary text-lg">Галерея загружается...</p>
      </section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full min-h-screen flex flex-col items-center bg-background py-16 px-4">
      <div className="w-full max-w-[1244px] mx-auto flex flex-col gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 text-center">
            {title}
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-12 text-center">
            {description}
          </p>
        </motion.div>

        <div className="flex flex-wrap -m-1 md:-m-2">
          <div className="flex flex-wrap w-full md:w-1/2">
            <div className="p-1 md:p-2 w-1/2">
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                alt="Галерея"
                className="w-full h-full object-cover object-center block rounded-lg"
                src={images[0]}
              />
            </div>
            <div className="p-1 md:p-2 w-1/2">
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
                alt="Галерея"
                className="w-full h-full object-cover object-center block rounded-lg"
                src={images[1]}
              />
            </div>
            <div className="p-1 md:p-2 w-full">
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
                alt="Галерея"
                className="w-full h-full object-cover object-center block rounded-lg"
                src={images[2]}
              />
            </div>
          </div>

          <div className="flex flex-wrap w-full md:w-1/2">
            <div className="p-1 md:p-2 w-full">
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 1 }}
                alt="Галерея"
                className="w-full h-full object-cover object-center block rounded-lg"
                src={images[3]}
              />
            </div>
            <div className="p-1 md:p-2 w-1/2">
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
                alt="Галерея"
                className="w-full h-full object-cover object-center block rounded-lg"
                src={images[4]}
              />
            </div>
            <div className="p-1 md:p-2 w-1/2">
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 1.4 }}
                alt="Галерея"
                className="w-full h-full object-cover object-center block rounded-lg"
                src={images[5]}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default GallerySection;
