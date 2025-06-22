import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      navigate("/", { replace: true }); // сбрасываем активное состояние
    } else {
      navigate("/");
    }
    setMobileMenuOpen(false); // закрываем меню на мобилке
  };

  return (
    <header className="bg-background shadow-md sticky top-0 z-50">
      <nav className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between relative">
        {/* ЛОГОТИП */}
        <div
          onClick={handleLogoClick}
          className="text-primary font-bold text-xl cursor-pointer">
          Orlov Brand
        </div>

        {/* ЦЕНТРАЛЬНОЕ МЕНЮ */}
        <ul className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-6">
          {navItems.map(({ label, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `text-sm font-medium uppercase transition-all duration-300 ${
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

        {/* ИКОНКИ */}
        <div className="hidden md:flex gap-4 text-primary text-xl">
          <FaSearchDollar className="cursor-pointer hover:scale-110 transition" />
          <FaShoppingCart className="cursor-pointer hover:scale-110 transition" />
          <FaUserTie className="cursor-pointer hover:scale-110 transition" />
        </div>

        {/* БУРГЕР-МЕНЮ на мобилках */}
        <button
          className="md:hidden text-primary text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <FaBars />
        </button>
      </nav>

      {/* ВЫПАДАЮЩЕЕ МЕНЮ НА МОБИЛКАХ */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background px-6 py-4 border-t border-gray-700 space-y-4">
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
