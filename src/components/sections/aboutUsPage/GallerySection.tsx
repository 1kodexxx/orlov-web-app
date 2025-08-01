// src/components/sections/aboutUsPage/GallerySection.tsx

import React from "react";
import { motion } from "framer-motion";
import {
  GALLERY_SECTION,
  HOVER_ITEMS_LEFT,
  HOVER_ITEMS_RIGHT,
  GALLERY_IMAGES,
} from "@/data/aboutUsData/gallery.data";

interface GallerySectionProps {
  /** Можно переопределить заголовок секции; по умолчанию берётся из данных */
  title?: string;
  /** Можно переопределить описание секции; по умолчанию берётся из данных */
  description?: string;
  /** (Опционально) переопределение изображений; по умолчанию берутся из data */
  imagesOverride?: string[];
  /** (Опционально) переопределение подписей слева */
  hoverItemsLeftOverride?: { title: string; text: string }[];
  /** (Опционально) переопределение подписей справа */
  hoverItemsRightOverride?: { title: string; text: string }[];
}

const GallerySection: React.FC<GallerySectionProps> = ({
  title = GALLERY_SECTION.title,
  description = GALLERY_SECTION.description,
  imagesOverride,
  hoverItemsLeftOverride,
  hoverItemsRightOverride,
}) => {
  const hoverItemsLeft = hoverItemsLeftOverride ?? HOVER_ITEMS_LEFT;
  const hoverItemsRight = hoverItemsRightOverride ?? HOVER_ITEMS_RIGHT;
  const images = imagesOverride ?? GALLERY_IMAGES;

  if (images.length < 6) {
    return (
      <section className="w-full min-h-screen flex items-center justify-center bg-background py-8 md:py-16 px-4">
        <p className="text-primary text-lg">Галерея загружается...</p>
      </section>
    );
  }

  return (
    <section className="w-full min-h-screen flex flex-col items-center bg-background py-8 md:py-16 px-4">
      <div className="w-full max-w-[1245px] mx-auto flex flex-col gap-8">
        {/* Заголовок */}
        <div className="text-center space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto">
            {description}
          </motion.p>
        </div>

        {/* Desktop: 6 карточек */}
        <div className="hidden md:flex flex-wrap -m-1 md:-m-2">
          <div className="flex flex-wrap w-full md:w-1/2">
            {hoverItemsLeft.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                className={`p-1 md:p-2 cursor-pointer ${
                  index === 2 ? "w-full" : "w-1/2"
                }`}>
                <div className="relative group overflow-hidden rounded-lg">
                  <img
                    src={images[index]}
                    alt={item.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 px-4">
                    <h3 className="text-white text-xl font-semibold mb-2 text-center">
                      {item.title}
                    </h3>
                    <p className="text-white text-base text-center">
                      {item.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap w-full md:w-1/2">
            {hoverItemsRight.map((item, idx) => (
              <motion.div
                key={idx + 3}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 + idx * 0.2 }}
                className={`p-1 md:p-2 ${
                  idx === 0 ? "w-full" : "w-1/2"
                } cursor-pointer`}>
                <div className="relative group overflow-hidden rounded-lg">
                  <img
                    src={images[idx + 3]}
                    alt={item.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 px-4">
                    <h3 className="text-white text-xl font-semibold mb-2 text-center">
                      {item.title}
                    </h3>
                    <p className="text-white text-base text-center">
                      {item.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: маленькие карточки */}
        <div className="flex md:hidden flex-wrap -m-1">
          {[0, 1].map((index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
              className="w-1/2 p-1 cursor-pointer">
              <div className="relative group overflow-hidden rounded-lg">
                <img
                  src={images[index]}
                  alt={hoverItemsLeft[index].title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 px-2 py-3">
                  <h3 className="text-white text-[12px] md:text-lg font-semibold mb-1 text-center">
                    {hoverItemsLeft[index].title}
                  </h3>
                  <p className="text-white text-[10px] md:text-base text-center">
                    {hoverItemsLeft[index].text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="w-full p-1 cursor-pointer">
            <div className="relative group overflow-hidden rounded-lg">
              <img
                src={images[3]}
                alt={hoverItemsRight[0].title}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110 max-h-[300px]"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 px-2 py-3">
                <h3 className="text-white text-[12px] md:text-lg font-semibold mb-1 text-center">
                  {hoverItemsRight[0].title}
                </h3>
                <p className="text-white text-[10px] md:text-base text-center">
                  {hoverItemsRight[0].text}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
