// src/components/layout/navBar/NavBar.tsx

import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaUserTie, FaSearchDollar, FaBars, FaTimes } from "react-icons/fa";
import { BiShoppingBag } from "react-icons/bi";
import { useState, useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import CartDropdown from "./navBar/CartDropdown";

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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const toggleMenu = () => setMobileMenuOpen((prev) => !prev);

  const handleLogoClick = () => {
    navigate("/");
    toggleMenu();
  };

  const handleSearchClick = () => {
    navigate("/catalog?focus=search");
    toggleMenu();
  };

  // Закрытие при клике вне корзины
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Закрытие при смене страницы
  useEffect(() => {
    setIsCartOpen(false);
  }, [location.pathname]);

  return (
    <header className="w-full sticky top-0 z-50 bg-background shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between relative">
        <div
          onClick={handleLogoClick}
          className="text-primary font-bold text-xl cursor-pointer">
          Orlov Brand
        </div>

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

        <div className="hidden lg:flex gap-4 items-center text-primary text-lg md:text-xl relative">
          <span
            onClick={handleSearchClick}
            className="cursor-pointer hover:scale-110 transition">
            <FaSearchDollar />
          </span>

          <div
            ref={cartRef}
            className="relative flex items-center cursor-pointer"
            onClick={() => setIsCartOpen((prev) => !prev)}>
            <div className="relative">
              <BiShoppingBag className="text-2xl" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs min-w-[16px] h-[16px] flex items-center justify-center rounded-full px-[4px]">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="ml-2 text-base font-medium text-[#CCCCCC]">
              {totalPrice} ₽
            </span>

            <AnimatePresence>
              {isCartOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}>
                  <CartDropdown onClose={() => setIsCartOpen(false)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <span className="cursor-pointer hover:scale-110 transition">
            <FaUserTie />
          </span>
        </div>

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
            <div className="flex justify-around py-4 text-primary text-2xl relative">
              <FaSearchDollar
                onClick={handleSearchClick}
                className="cursor-pointer hover:scale-110 transition"
              />
              <span
                onClick={() => setIsCartOpen((prev) => !prev)}
                ref={cartRef}
                className="relative flex items-center cursor-pointer">
                <div className="relative">
                  <BiShoppingBag />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs min-w-[16px] h-[16px] flex items-center justify-center rounded-full px-[4px]">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="ml-1 text-sm font-medium text-[#CCCCCC]">
                  {totalPrice} ₽
                </span>

                <AnimatePresence>
                  {isCartOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}>
                      <CartDropdown onClose={() => setIsCartOpen(false)} />
                    </motion.div>
                  )}
                </AnimatePresence>
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
