import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface PromoSectionProps {
  title: string;
  buttonText: string;
  buttonLink: string;
  description: string;
  imageUrl1: string;
  imageUrl2: string;
  backgroundColor?: string;
}

const PromoSection: React.FC<PromoSectionProps> = ({
  title,
  buttonText,
  buttonLink,
  description,
  imageUrl1,
  imageUrl2,
  backgroundColor = "bg-[#EFE393]",
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}>
      <div className="mx-auto max-w-screen-xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch min-h-[500px]">
          {/* Левая часть с текстом */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`${backgroundColor} p-8 md:p-12 lg:px-16 lg:py-24 flex items-center h-full`}>
            <div className="w-full space-y-6 flex flex-col justify-center h-full">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-2xl font-bold text-[#181818] md:text-3xl text-left">
                {title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-[#181818]/90 text-justify leading-relaxed whitespace-pre-line text-sm md:text-base">
                {description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-4 md:mt-8">
                <Link
                  to={buttonLink}
                  className="inline-block rounded-sm border border-[#181818] bg-[#181818] px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#181818] focus:ring-3 focus:ring-yellow-400 focus:outline-hidden">
                  {buttonText}
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Правая часть с изображениями */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="h-full">
            <img
              alt="Promo 1"
              src={imageUrl1}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="h-full">
            <img
              alt="Promo 2"
              src={imageUrl2}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default PromoSection;
