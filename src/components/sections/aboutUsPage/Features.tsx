import { motion } from "framer-motion";
import { FaCrown, FaHandshake, FaGem } from "react-icons/fa";
import { Link } from "react-router-dom";

const Features = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-16 px-4 text-text-secondary">
      {/* Контейнер с адаптивной шириной */}
      <div className="w-full px-0 sm:px-4 md:max-w-screen-xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-primary mb-4 text-center">
          Преимущества Orlov Brand
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

        <div className="flex flex-col md:grid md:grid-cols-3 gap-12 items-stretch">
          {/* Преимущество 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col h-full justify-between items-center text-center space-y-4">
            <div className="bg-primary p-6 rounded-full">
              <FaCrown className="text-4xl text-primary-contrast" />
            </div>
            <h3 className="text-xl font-semibold text-primary">
              Премиальное
              <br />
              качество
            </h3>
            <p className="text-text-secondary text-justify leading-relaxed">
              Отборные материалы, тщательная ручная работа <br /> и строгий
              контроль качества – основа наших изделий. Мы дарим нашим клиентам
              к каждому заказу целый ряд преимуществ: элитарная упаковка,
              престижное наполнение и авторский подарок — решение ORLOV для Вас.
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
            className="flex flex-col h-full justify-between items-center text-center space-y-4">
            <div className="bg-primary p-6 rounded-full">
              <FaHandshake className="text-4xl text-primary-contrast" />
            </div>
            <h3 className="text-xl font-semibold text-primary">
              Индивидуальный <br />
              подход
            </h3>
            <p className="text-text-secondary text-justify leading-relaxed">
              Мы понимаем, что каждый клиент уникален. Именно поэтому мы
              разрабатываем решения, полностью соответствующие вашим пожеланиям.
              Компания ORLOV знает и ценит своих клиентов. Для нас главное —
              ваше уважение и доверие!
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
            className="flex flex-col h-full justify-between items-center text-center space-y-4">
            <div className="bg-primary p-6 rounded-full">
              <FaGem className="text-4xl text-primary-contrast" />
            </div>
            <h3 className="text-xl font-semibold text-primary">
              Стиль <br />и эксклюзив
            </h3>
            <p className="text-text-secondary text-justify leading-relaxed">
              Каждый аксессуар от ORLOV — это отражение статуса и уверенности.
              Мы создаем предметы искусства для наших клиентов, постоянно
              увеличивая ассортимент товаров. С нами вы знаете, что доверяете
              лучшему!
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
