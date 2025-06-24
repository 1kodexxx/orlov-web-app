import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/Button";

interface InfoSectionProps {
  title: string;
  description: string; // строка с тегами <br/> для ручного переноса
  imageUrl: string;
  reverse?: boolean;
  backgroundColor?: string;
  initialButtonText?: string;
  hoverButtonText?: string;
  buttonLink?: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({
  title,
  description,
  imageUrl,
  reverse = false,
  backgroundColor = "bg-background",
  initialButtonText,
  hoverButtonText,
  buttonLink,
}) => {
  return (
    <section
      className={`${backgroundColor} text-white py-12 min-h-[80vh] md:min-h-[calc(100vh-3rem)] flex items-center`}>
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-8 w-full">
        {/* Левая часть */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className={`flex-1 text-white text-left space-y-6 ${
            reverse ? "md:order-2" : "md:order-1"
          }`}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center md:text-left">
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg leading-relaxed max-w-lg mx-auto md:mx-0 text-center md:text-left"
            dangerouslySetInnerHTML={{ __html: description }}
          />

          {initialButtonText && hoverButtonText && buttonLink && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row gap-4 w-full max-w-xs md:max-w-none mx-auto md:mx-0 md:justify-start justify-center items-center text-center md:text-left">
              <div className="w-full md:w-auto">
                <Button
                  initialText={initialButtonText}
                  hoverText={hoverButtonText}
                  to={buttonLink}
                />
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Правая часть */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className={`flex-1 flex items-center justify-center mb-8 md:mb-0 ${
            reverse ? "md:order-1" : "md:order-2"
          }`}>
          <img
            src={imageUrl}
            alt="image"
            className="w-full max-w-[320px] sm:max-w-[480px] md:max-w-[720px] rounded-lg object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default InfoSection;
