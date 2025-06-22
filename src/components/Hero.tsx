// src/components/Hero.tsx
import { motion } from "framer-motion";
import { heroBg } from "@/constants/backgrounds";

const Hero = () => {
  return (
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <section
        className="min-h-[90vh] w-full relative text-primary flex items-center justify-center"
        style={{
          backgroundImage: `url(${heroBg.src})`,
          backgroundSize: heroBg.size || "cover",
          backgroundPosition: heroBg.position || "center",
          backgroundRepeat: heroBg.repeat || "no-repeat",
          filter: `${heroBg.blur ? "blur(8px)" : ""} brightness(${
            heroBg.brightness ?? 1
          })`,
        }}>
        {/* Затемнение/оверлей, если нужно */}
        {heroBg.overlayColor && (
          <div
            className="absolute inset-0 z-0"
            style={{ background: heroBg.overlayColor }}
          />
        )}

        <div className="relative z-10 w-full px-4">
          <div className="max-w-screen-xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
                ORLOV BRAND
              </h1>
              <p className="text-lg md:text-xl text-text-secondary mb-8">
                Элитные чехлы ручной работы. Роскошь в каждой детали.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
