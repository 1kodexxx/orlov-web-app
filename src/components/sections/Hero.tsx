import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, Loader } from "../common";

const HEADER_HEIGHT_REM = 3; // высота header в rem
const MARQUEE_HEIGHT_PX = 32; // высота бегущей строки в px

const Hero = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // предзагрузка лого
  useEffect(() => {
    const img = new Image();
    img.src = "/logo.png";
    img.onload = () => setIsImageLoaded(true);
  }, []);

  // рассчитываем --vh как 1% от window.innerHeight
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
        height: `calc(var(--vh, 1vh)*100 - ${HEADER_HEIGHT_REM}rem)`,
        paddingBottom: `${MARQUEE_HEIGHT_PX}px`,
      }}>
      {/* keyframes */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>

      {/* фон */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* контент, чуть приподнятый */}
      <div className="relative z-10 flex-1 flex items-center w-full pb-8 transform -translate-y-4">
        <div className="max-w-screen-xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-8 w-full">
          {/* текст */}
          <div className="flex-1 text-primary space-y-6 transform -translate-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-center md:text-left">
              Добро пожаловать <br /> в Orlov Brand
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base sm:text-lg leading-relaxed max-w-lg mx-auto md:mx-0 text-center md:text-left">
              Премиальный бренд аксессуаров "ORLOV" создаст для&nbsp;Вас
              уникальный образ. Авторский вид и эксклюзивный дизайн подчеркнут
              статус обладателя. Наш онлайн-бутик представляет ассортимент для
              настоящих чемпионов по&nbsp;жизни!
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-sm md:text-base font-semibold mt-2 text-center md:text-left">
              "Когда знаешь, что доверяешь ЛУЧШЕМУ!"
              <br />
              <span className="text-xs md:text-sm font-light">
                © IVAN ORLOV
              </span>
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 w-full md:w-auto mx-auto md:mx-0">
              <Button
                initialText="Перейти в каталог"
                hoverText="Поехали!"
                to="/catalog"
              />
            </motion.div>
          </div>

          {/* логотип */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 flex items-center justify-center mb-8 md:mb-0 min-h-[320px] sm:min-h-[480px] md:min-h-[720px] transform -translate-y-2">
            {isImageLoaded ? (
              <img
                src="/logo.png"
                alt="Orlov Hero"
                className="w-full max-w-[720px] rounded-lg object-cover"
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

export default Hero;
