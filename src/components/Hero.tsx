import { motion } from "framer-motion";
import Button from "@/components/Button";
import Marquee from "./Marquee";
import logo from "@/assets/logo.svg";

const Hero = () => {
  return (
    <section
      className="relative w-full overflow-x-hidden flex flex-col"
      style={{ minHeight: "calc(100vh - 3rem)" }}>
      {/* Keyframes for marquee animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>

      {/* Background and overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background.png')" }}>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Main content: flexible height */}
      <div className="relative z-10 flex-1 flex items-center w-full pb-12">
        <div className="max-w-screen-xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-8 w-full">
          {/* Left side */}
          <div className="flex-1 text-white text-center md:text-left space-y-6 flex flex-col justify-center">
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
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex justify-center md:justify-start">
              <Button
                initialText="Перейти в Каталог 💎"
                hoverText="Поехали! 🚀"
                to="/catalog"
              />
            </motion.div>
          </div>

          {/* Right side: logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 flex items-center justify-center h-full">
            <img
              src={logo}
              alt="Orlov Logo"
              className="h-full object-contain max-h-[400px] w-auto"
            />
          </motion.div>
        </div>
      </div>

      {/* Marquee ticker */}
      <Marquee />
    </section>
  );
};

export default Hero;
