// src/components/sections/aboutUsPage/CoatOfArms.tsx

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, Loader } from "@/components/common";
import { COAT_OF_ARMS } from "@/data/contactsData/coatOfArms.data";

const CoatOfArms: React.FC = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const {
    texts: { title, paragraphs, noteBold, noteLight },
    cta: { text: ctaText, link: ctaLink },
    images: { preload, main },
    config: { headerHeightRem },
  } = COAT_OF_ARMS;

  useEffect(() => {
    const img = new Image();
    img.src = preload;
    img.onload = () => setIsImageLoaded(true);
  }, [preload]);

  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden flex flex-col"
      style={{
        minHeight: `calc(var(--vh, 1vh)*100 - ${headerHeightRem}rem)`,
      }}>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>

      <div className="relative z-10 flex-1 flex items-center w-full pb-8 transform -translate-y-4">
        <div className="max-w-screen-xl mx-auto px-4 flex flex-col-reverse md:flex-row-reverse items-center justify-between gap-8 w-full">
          <div className="flex-1 text-white space-y-6 transform -translate-y-2 text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-primary text-3xl sm:text-4xl md:text-5xl font-bold">
              {title}
            </motion.h1>

            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="text-base sm:text-lg leading-relaxed max-w-lg mx-auto md:mx-0">
                {p}
              </motion.p>
            ))}

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-text-primary text-sm md:text-base font-semibold mt-2">
              {noteBold}
              <br />
              <span className="text-xs md:text-sm font-light">{noteLight}</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col md:flex-row gap-4 mx-auto md:mx-0 justify-center md:justify-start items-center">
              <Button initialText={ctaText} to={ctaLink} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 flex items-center justify-center mb-8 md:mb-0 w-full h-full transform -translate-y-2">
            {isImageLoaded ? (
              <motion.img
                src={main}
                alt="Герб"
                initial={{
                  scale: 1,
                  filter:
                    "brightness(1) drop-shadow(0px 0px 0px rgba(0,0,0,0))",
                }}
                animate={{
                  scale: 1,
                  filter:
                    "brightness(1) drop-shadow(0px 0px 0px rgba(0,0,0,0))",
                }}
                whileHover={{
                  scale: 1.05,
                  filter:
                    "brightness(1.5) drop-shadow(0 0 20px rgba(255,255,255,0.8))",
                }}
                transition={{ duration: 0.3 }}
                className="w-auto h-auto md:w-auto lg:w-[450px] pt-[5px] max-w-full max-h-full border-none outline-none cursor-pointer"
              />
            ) : (
              <Loader />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CoatOfArms;
