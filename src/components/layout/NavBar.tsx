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
  const [previousTotalItems, setPreviousTotalItems] = useState(0);
  const [animateBadge, setAnimateBadge] = useState(false);
  const [animatePrice, setAnimatePrice] = useState(false);

  const desktopCartRef = useRef<HTMLDivElement>(null);
  const mobileCartRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        desktopCartRef.current &&
        !desktopCartRef.current.contains(event.target as Node) &&
        mobileCartRef.current &&
        !mobileCartRef.current.contains(event.target as Node)
      ) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsCartOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (totalItems > previousTotalItems) {
      setAnimateBadge(true);
      setAnimatePrice(true);

      setTimeout(() => setAnimateBadge(false), 300);
      setTimeout(() => setAnimatePrice(false), 300);
    }
    setPreviousTotalItems(totalItems);
  }, [totalItems]);

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
            className="relative flex items-center cursor-pointer"
            onClick={() => setIsCartOpen((prev) => !prev)}>
            <div className="relative">
              <BiShoppingBag className="text-2xl" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: animateBadge ? 1.15 : 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 250, damping: 16 }}
                    className="absolute -top-2 -right-2 bg-red-600 text-white text-xs min-w-[16px] h-[16px] flex items-center justify-center rounded-full px-[4px]">
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <motion.span
              animate={animatePrice ? { scale: 1.1 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 250, damping: 16 }}
              className="ml-2 text-base font-medium text-[#CCCCCC]">
              {totalPrice} ₽
            </motion.span>
          </div>

          <span className="cursor-pointer hover:scale-110 transition">
            <FaUserTie />
          </span>

          {/* Десктопный дропдаун */}
          <AnimatePresence>
            {isCartOpen && (
              <motion.div
                ref={desktopCartRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-12 z-50">
                <CartDropdown onClose={() => setIsCartOpen(false)} />
              </motion.div>
            )}
          </AnimatePresence>
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

      {/* Мобильное меню */}
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

              <div
                className="relative flex items-center cursor-pointer"
                onClick={() => setIsCartOpen((prev) => !prev)}>
                <div className="relative">
                  <BiShoppingBag />
                  <AnimatePresence>
                    {totalItems > 0 && (
                      <motion.span
                        key="mobile-badge"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: animateBadge ? 1.15 : 1, opacity: 1 }}
                        exit={{ scale: 0.7, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 250,
                          damping: 16,
                        }}
                        className="absolute -top-2 -right-2 bg-red-600 text-white text-xs min-w-[16px] h-[16px] flex items-center justify-center rounded-full px-[4px]">
                        {totalItems}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                <motion.span
                  animate={animatePrice ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 250, damping: 16 }}
                  className="ml-1 text-sm font-medium text-[#CCCCCC]">
                  {totalPrice} ₽
                </motion.span>
              </div>

              <FaUserTie className="cursor-pointer hover:scale-110 transition" />
            </div>

            {/* Мобильный дропдаун */}
            <AnimatePresence>
              {isCartOpen && (
                <motion.div
                  ref={mobileCartRef}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="px-4 pb-4">
                  <CartDropdown onClose={() => setIsCartOpen(false)} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;
