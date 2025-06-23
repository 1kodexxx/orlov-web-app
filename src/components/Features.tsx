import { motion } from "framer-motion";
import { FaCrown, FaShieldAlt, FaGem } from "react-icons/fa";
import { Link } from "react-router-dom";

const Features = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-16 px-4 text-text-secondary">
      {/* Контейнер идентичный NavBar */}
      <div className="max-w-screen-xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-primary mb-4 text-center">
          Преимущества Orlov
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg text-text-secondary max-w-2xl mx-auto mb-12 text-center">
          Элитные чехлы для телефонов Orlov — это не просто защита, это статус,
          премиум и стиль, который подчеркивает ваш уникальный вкус.
        </motion.p>

        <div className="grid gap-12 md:grid-cols-3">
          {/* Преимущество 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col items-center text-center space-y-4">
            <div className="bg-primary p-6 rounded-full">
              <FaCrown className="text-4xl text-primary-contrast" />
            </div>
            <h3 className="text-xl font-semibold text-primary">
              Премиальный Дизайн
            </h3>
            <p className="text-text-secondary">
              Каждый чехол Orlov — это авторская работа с утонченным стилем и
              вниманием к каждой детали.
            </p>
            <Link
              to="/catalog"
              className="text-primary hover:underline flex items-center gap-1">
              Смотреть каталог →
            </Link>
          </motion.div>

          {/* Преимущество 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col items-center text-center space-y-4">
            <div className="bg-primary p-6 rounded-full">
              <FaShieldAlt className="text-4xl text-primary-contrast" />
            </div>
            <h3 className="text-xl font-semibold text-primary">
              Высокая Защита
            </h3>
            <p className="text-text-secondary">
              Чехлы Orlov не только стильные, но и обеспечивают надежную защиту
              вашего смартфона в любых условиях.
            </p>
            <Link
              to="/catalog"
              className="text-primary hover:underline flex items-center gap-1">
              Смотреть каталог →
            </Link>
          </motion.div>

          {/* Преимущество 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-col items-center text-center space-y-4">
            <div className="bg-primary p-6 rounded-full">
              <FaGem className="text-4xl text-primary-contrast" />
            </div>
            <h3 className="text-xl font-semibold text-primary">
              Эксклюзивность
            </h3>
            <p className="text-text-secondary">
              Лимитированные коллекции, которые подчёркивают индивидуальность и
              выделяют вас из толпы.
            </p>
            <Link
              to="/catalog"
              className="text-primary hover:underline flex items-center gap-1">
              Смотреть каталог →
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Features;
