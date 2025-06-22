import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#141414] text-gold py-8 px-4">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-0">
        {/* Левая часть */}
        <div>
          <h2 className="text-xl font-bold text-gold mb-2">Orlov Brand</h2>
          <p className="text-sm text-white/80">
            © 2025 Orlov Brand. Все права защищены.
          </p>
        </div>

        {/* Центральные ссылки */}
        <div className="flex flex-col gap-1 text-gold text-sm">
          <Link to="/" className="hover:underline">
            Главная
          </Link>
          <Link to="/catalog" className="hover:underline">
            Каталог
          </Link>
          <Link to="/delivery" className="hover:underline">
            Доставка
          </Link>
          <Link to="/contacts" className="hover:underline">
            Контакты
          </Link>
          <Link to="/reviews" className="hover:underline">
            Отзывы
          </Link>
        </div>

        {/* Соцсети */}
        <div className="flex items-center gap-4 text-gold text-xl">
          <a href="#" aria-label="VK" className="hover:text-white">
            <i className="fab fa-vk"></i>
          </a>
          <a href="#" aria-label="Telegram" className="hover:text-white">
            <i className="fab fa-telegram-plane"></i>
          </a>
          <a href="#" aria-label="WhatsApp" className="hover:text-white">
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
      </div>

      {/* Нижний слоган */}
      <div className="mt-8 text-center text-sm text-gold/80">
        Orlov — Роскошь. Статус. Качество.
      </div>
    </footer>
  );
};

export default Footer;
