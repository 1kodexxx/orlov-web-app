import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../assets/background.png";

const Hero = () => {
  return (
    <section className="min-h-[90vh] flex items-center justify-center text-center relative bg-background text-primary">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-0" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 px-6 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          ORLOV BRAND
        </h1>
        <p className="text-lg md:text-xl text-text-secondary mb-8">
          Элитные чехлы ручной работы. Роскошь в каждой детали.
        </p>

        <Link
          to="/catalog"
          className="inline-block bg-primary text-background px-8 py-3 rounded-full font-semibold text-sm uppercase tracking-wide hover:brightness-110 transition">
          Перейти в каталог
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;
