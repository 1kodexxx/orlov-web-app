import React from "react";
import { motion } from "framer-motion";
import Button from "./Button";

interface PromoSectionProps {
  title: string;
  description: string;
  buttonInitialText: string; // Новый проп
  buttonHoverText: string; // Новый проп
  buttonLink: string;
  imageUrl1: string;
  imageUrl2: string;
  backgroundColor?: string;
}

const PromoSection: React.FC<PromoSectionProps> = ({
  title,
  description,
  buttonInitialText,
  buttonHoverText,
  buttonLink,
  imageUrl1,
  imageUrl2,
  backgroundColor = "bg-primary",
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full min-h-screen flex flex-col md:flex-row items-center bg-background">
      <div className="max-w-screen-xl mx-auto px-4 py-8 w-full flex flex-col-reverse md:flex-row gap-4 items-stretch">
        {/* Левая часть с текстом */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`${backgroundColor} p-8 md:p-12 lg:px-16 lg:py-24 flex items-center justify-center w-full`}>
          <div className="mx-auto max-w-xl text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-background">
              {title}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed mt-4 text-background/90 whitespace-pre-line">
              {description}
            </p>

            {/* Кнопка по центру */}
            <div className="mt-4 md:mt-8 flex justify-center">
              <Button
                initialText={buttonInitialText}
                hoverText={buttonHoverText}
                to={buttonLink}
                variant="dark"
              />
            </div>
          </div>
        </motion.div>

        {/* Правая часть с изображениями */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2 w-full">
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            alt="Promo 1"
            src={imageUrl1}
            className="h-40 w-full object-cover sm:h-56 md:h-full"
          />
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            alt="Promo 2"
            src={imageUrl2}
            className="h-40 w-full object-cover sm:h-56 md:h-full"
          />
        </div>
      </div>
    </motion.section>
  );
};

export default PromoSection;
