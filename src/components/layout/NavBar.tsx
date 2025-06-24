import { NavLink, useNavigate } from "react-router-dom";
import {
  FaUserTie,
  FaShoppingCart,
  FaSearchDollar,
  FaBars,
} from "react-icons/fa";
import { useState } from "react";

const navItems = [
  { label: "Главная", path: "/" },
  { label: "О нас", path: "/about-us" },
  { label: "Каталог", path: "/catalog" },
  { label: "Доставка", path: "/delivery" },
  { label: "Контакты", path: "/contacts" },
  { label: "Отзывы", path: "/reviews" },
];

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-background shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between relative">
        {/* Логотип */}
        <div
          onClick={handleLogoClick}
          style={{ cursor: 'url("/cursor/cursor-pointer.png"), pointer' }}
          className="text-primary font-bold text-xl cursor-pointer">
          Orlov Brand
        </div>

        {/* Центр. меню */}
        <ul className="hidden lg:flex absolute left-1/2 -translate-x-1/2 gap-4 md:gap-6 flex-wrap">
          {navItems.map(({ label, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `text-xs md:text-base font-normal transition-all duration-300 ${
                    isActive
                      ? "text-primary underline underline-offset-4"
                      : "text-text-secondary hover:text-primary"
                  }`
                }>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Иконки */}
        <div className="hidden lg:flex gap-2 md:gap-4 text-primary text-lg md:text-xl">
          <span className="cursor-pointer hover:scale-110 transition">
            <FaSearchDollar />
          </span>
          <span className="cursor-pointer hover:scale-110 transition">
            <FaShoppingCart />
          </span>
          <span className="cursor-pointer hover:scale-110 transition">
            <FaUserTie />
          </span>
        </div>

        {/* Бургер для ширины ниже lg */}
        <button
          className="lg:hidden text-primary text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <FaBars />
        </button>
      </div>

      {/* Мобильное меню */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-background px-6 py-4 border-t border-gray-700 space-y-4">
          {navItems.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-text-secondary text-sm hover:text-primary transition">
              {label}
            </NavLink>
          ))}
          <div className="flex justify-around pt-4 text-primary text-2xl">
            <FaSearchDollar />
            <FaShoppingCart />
            <FaUserTie />
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
