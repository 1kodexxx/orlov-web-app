import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, Loader } from "@/components/common";

const HEADER_HEIGHT_REM = 3;

const CoatOfArms = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "https://i.postimg.cc/QNzWgGX0/coat-Of-Arms.png";
    img.onload = () => setIsImageLoaded(true);
  }, []);

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
    <>
      <section
        className="relative w-full overflow-hidden flex flex-col"
        style={{
          minHeight: `calc(var(--vh, 1vh)*100 - ${HEADER_HEIGHT_REM}rem)`,
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
                Свяжитесь с нами
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-base sm:text-lg leading-relaxed max-w-lg mx-auto md:mx-0">
                У Вас есть вопрос или предложение? Мы всегда на связи. Свяжитесь
                с нами удобным способом, и мы обязательно ответим как можно
                скорее.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-sm md:text-base font-semibold mt-2">
                Наш бренд — это не только стиль, но и забота.
                <br />
                <span className="text-xs md:text-sm font-light">
                  Пишите — мы рядом.
                </span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col md:flex-row gap-4 mx-auto md:mx-0 justify-center md:justify-start items-center">
                <Button
                  initialText="Связаться с нами"
                  hoverText="Наш канал в TG"
                  to="https://t.me/ORLOV_brand777"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1 flex items-center justify-center mb-8 md:mb-0 w-full h-full transform -translate-y-2">
              {isImageLoaded ? (
                <img
                  src="https://i.postimg.cc/fRZnppHN/coat-Of-Arms.webp"
                  alt="Герб"
                  className="w-full h-auto max-w-full max-h-full border-none outline-none"
                />
              ) : (
                <Loader />
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CoatOfArms;
