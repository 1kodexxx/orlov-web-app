// src/components/Hero.tsx
import { motion } from "framer-motion";
import Button from "@/components/Button";
import logo from "@/assets/logo.svg";

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Фоновое изображение на всю ширину секции */}
      <div
        className="absolute top-0 left-0 right-0 h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background.png')" }}>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Контейнер для выравнивания по NavBar */}
      <div className="relative z-10 w-full">
        <div className="max-w-screen-xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:min-h-[80vh] py-16">
          {/* Левая часть: текст и кнопка */}
          <div className="flex-1 text-white text-center md:text-left space-y-6 flex flex-col justify-center h-full">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold">
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
              className="text-sm md:text-base font-semibold not-italic mt-2">
              "Когда знаешь, что доверяешь ЛУЧШЕМУ!"
              <br />
              <span className="text-xs md:text-sm font-light">
                © IVAN ORLOV
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}>
              <Button variant="solid" size="md" className="gap-2">
                Перейти в Каталог <span className="text-xl">👑</span>
              </Button>
            </motion.div>
          </div>

          {/* Правая часть: логотип с высотой блока */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 flex items-center justify-center h-full">
            <img
              src={logo}
              alt="Orlov Logo"
              className="h-full object-contain max-h-[500px] w-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
