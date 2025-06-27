import { NavLink, useNavigate } from "react-router-dom";
import {
  FaUserTie,
  FaShoppingCart,
  FaSearchDollar,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

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
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMenu = () => setMobileMenuOpen((prev) => !prev);
  const handleLogoClick = () => {
    navigate("/");
    toggleMenu();
  };
  const handleSearchClick = () => {
    navigate("/catalog?focus=search");
    toggleMenu();
  };
  const handleCartClick = () => {
    navigate("/cart");
    toggleMenu();
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-background shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between relative">
        {/* Logo */}
        <div
          onClick={handleLogoClick}
          className="text-primary font-bold text-xl cursor-pointer">
          Orlov Brand
        </div>

        {/* Desktop menu */}
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

        {/* Desktop icons */}
        <div className="hidden lg:flex gap-2 md:gap-4 text-primary text-lg md:text-xl">
          <span
            onClick={handleSearchClick}
            className="cursor-pointer hover:scale-110 transition">
            <FaSearchDollar />
          </span>
          <span
            onClick={handleCartClick}
            className="relative cursor-pointer hover:scale-110 transition">
            <FaShoppingCart />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] min-w-[16px] h-[16px] flex items-center justify-center rounded-full px-[4px]">
                {totalItems}
              </span>
            )}
          </span>
          <span className="cursor-pointer hover:scale-110 transition">
            <FaUserTie />
          </span>
        </div>

        {/* Mobile burger */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-primary text-2xl focus:outline-none transition-transform duration-300">
          {mobileMenuOpen ? (
            <FaTimes className="transform rotate-90" />
          ) : (
            <FaBars />
          )}
        </button>
      </div>

      {/* Mobile menu with animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-background overflow-hidden border-t border-gray-700">
            <div className="px-6 py-4 space-y-4">
              {navItems.map(({ label, path }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={toggleMenu}
                  className="block text-text-secondary text-sm hover:text-primary transition">
                  {label}
                </NavLink>
              ))}
            </div>
            <div className="flex justify-around py-4 text-primary text-2xl">
              <FaSearchDollar
                onClick={handleSearchClick}
                className="cursor-pointer hover:scale-110 transition"
              />
              <span
                onClick={handleCartClick}
                className="relative cursor-pointer hover:scale-110 transition">
                <FaShoppingCart />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] min-w-[16px] h-[16px] flex items-center justify-center rounded-full px-[4px]">
                    {totalItems}
                  </span>
                )}
              </span>
              <FaUserTie className="cursor-pointer hover:scale-110 transition" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;
