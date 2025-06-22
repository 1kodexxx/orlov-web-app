// src/components/Hero.tsx
import { motion } from "framer-motion";
import { heroBg } from "@/constants/backgrounds";

const Hero = () => {
  return (
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <section
        className="min-h-screen w-full relative text-primary flex items-center justify-center"
        style={{
          backgroundImage: `url(${heroBg.src})`,
          backgroundSize: heroBg.size || "cover",
          backgroundPosition: heroBg.position || "center",
          backgroundRepeat: heroBg.repeat || "no-repeat",
          filter: `${heroBg.blur ? "blur(8px)" : ""} brightness(${
            heroBg.brightness ?? 1
          })`,
        }}>
        {heroBg.overlayColor && (
          <div
            className="absolute inset-0 z-0"
            style={{ background: heroBg.overlayColor }}
          />
        )}

        <div className="relative z-10 w-full px-4">
          <div className="max-w-screen-xl mx-auto text-center flex flex-col items-center gap-4">
            {/* Логотип */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              className="w-[460px] max-w-[90vw] h-auto mb-4">
              <img
                src="/src/assets/logo.svg"
                alt="Orlov Brand Logo"
                className="w-full h-auto"
              />
            </motion.div>

            {/* Текст под логотипом */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
              className="text-base md:text-lg lg:text-xl text-gold font-thin leading-relaxed max-w-3xl px-2">
              Премиальный бренд аксессуаров{" "}
              <span className="font-bold text-gold">ORLOV</span> создаст для Вас
              уникальный образ. Авторский вид и эксклюзивный дизайн подчеркнут
              статус обладателя. Наш онлайн-бутик представляет ассортимент для
              настоящих чемпионов по жизни!
            </motion.p>

            {/* Цитата */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
              className="text-sm md:text-base font-semibold text-gold not-italic mt-2">
              "Когда знаешь, что доверяешь ЛУЧШЕМУ!"
              <br />
              <span className="text-xs md:text-sm font-light">
                © IVAN ORLOV
              </span>
            </motion.p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
