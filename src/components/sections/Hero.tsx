import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, Loader } from "../common";

const HEADER_HEIGHT_REM = 3;

const Hero = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // предзагрузка логотипа
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
    <>
      {/* Hero Section */}
      <section
        className="relative w-full overflow-hidden flex flex-col"
        style={{
          minHeight: `calc(var(--vh, 1vh)*100 - ${HEADER_HEIGHT_REM}rem)`,
        }}>
        {/* keyframes for marquee animation */}
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}</style>

        {/* background image + overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://i.postimg.cc/hG1ZPFd3/background.webp')",
          }}>
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* content wrapper */}
        <div className="relative z-10 flex-1 flex items-center w-full pb-8 pt-4 transform -translate-y-4">
          <div className="max-w-screen-xl mx-auto px-4 flex flex-col-reverse md:flex-row-reverse items-center justify-between gap-8 w-full">
            {/* текстовая колонка */}
            <div className="flex-1 text-white space-y-6 transform -translate-y-2 text-center md:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-primary text-3xl sm:text-4xl md:text-5xl font-bold">
                Добро пожаловать <br /> в Orlov Brand
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-base sm:text-lg leading-relaxed max-w-lg mx-auto md:mx-0">
                Премиальный бренд аксессуаров "ORLOV" создаст для Вас уникальный
                образ. Авторский вид и эксклюзивный дизайн подчеркнут статус
                обладателя. Наш онлайн-бутик представляет ассортимент для
                настоящих чемпионов по жизни!
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-primary text-sm md:text-base font-semibold mt-2">
                "Когда знаешь, что доверяешь ЛУЧШЕМУ!"
                <br />
                <span className="text-white text-xs md:text-sm font-light">
                  © IVAN ORLOV
                </span>
              </motion.p>

              {/* Центрируем кнопку на мобилке */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col md:flex-row gap-4 mx-auto md:mx-0 justify-center md:justify-start items-center">
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
              className="flex-1 flex items-center justify-center mb-8 md:mb-0 min-h-[300px] sm:min-h-[360px] md:min-h-[650px] transform -translate-y-2">
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
    </>
  );
};

export default Hero;
