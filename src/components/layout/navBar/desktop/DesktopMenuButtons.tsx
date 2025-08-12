// src/components/layout/navBar/desktop/DesktopMenuButtons.tsx
import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserTie, FaSearchDollar } from "react-icons/fa";
import { BiShoppingBag } from "react-icons/bi";
import { useCart } from "@/context/useCart";

// Redux
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  toggleCart,
  toggleSearch,
  toggleAccount,
  closeAll,
  closeCart,
  closeSearch,
  closeAccount,
} from "@/store/slices/navbarSlice";

import CartDropdown from "../cartDropdown/CartDropdown";
import SearchDropdown from "../searchDropdown/SearchDropdown";
import { AccountDropdown } from "../accountDropdown";

const DesktopMenuButtons: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const desktopCartRef = useRef<HTMLDivElement>(null);
  const desktopAccountRef = useRef<HTMLDivElement>(null);

  const {
    isCartOpen,
    isSearchOpen,
    isAccountOpen,
    animateBadge,
    animatePrice,
  } = useAppSelector((s) => s.navbar);

  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cartItems
    .reduce((sum, i) => sum + i.price * i.quantity, 0)
    .toFixed(2);

  // Search
  const handleSearchClick = () => {
    dispatch(toggleSearch());
    dispatch(closeCart());
    dispatch(closeAccount());
  };

  // Cart
  const handleGoToCart = () => {
    dispatch(closeCart());
    dispatch(closeAll());
    navigate("/cart");
  };

  // Account
  const handleAccountClick = () => {
    dispatch(toggleAccount());
    dispatch(closeCart());
    dispatch(closeSearch());
  };

  // Клик вне дропдаунов — закрыть все
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      const inCart =
        desktopCartRef.current && desktopCartRef.current.contains(target);

      const inAccount =
        desktopAccountRef.current && desktopAccountRef.current.contains(target);

      if (!inCart && !inAccount) {
        dispatch(closeAll());
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [dispatch]);

  // TODO: сюда подвяжешь настоящий logout
  const handleSignOut = async () => {
    // await api.auth.logout();
  };

  return (
    <div className="hidden lg:flex gap-4 items-center text-primary text-lg md:text-xl relative">
      {/* Search */}
      <div onClick={handleSearchClick} className="cursor-pointer">
        <FaSearchDollar className="hover:scale-110 transition" />
      </div>

      {/* Cart icon + badge + price */}
      <div
        className="relative flex items-center cursor-pointer"
        onClick={() => {
          dispatch(toggleCart());
          dispatch(closeSearch());
          dispatch(closeAccount());
        }}>
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
        <motion.span
          animate={animatePrice ? { scale: 1.1 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 250, damping: 16 }}
          className="ml-2 text-base font-medium text-[#CCCCCC]">
          {totalPrice} ₽
        </motion.span>
      </div>

      {/* Account */}
      <div onClick={handleAccountClick} className="cursor-pointer">
        <FaUserTie className="hover:scale-110 transition" />
      </div>

      {/* Cart Dropdown */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            ref={desktopCartRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-12 z-50">
            <CartDropdown
              onClose={() => dispatch(closeCart())}
              onGoToCart={handleGoToCart}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Dropdown */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-16 top-12 z-50">
            <SearchDropdown
              onClose={() => dispatch(closeSearch())}
              onToggleMenu={() => dispatch(closeSearch())}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Account Dropdown */}
      <AnimatePresence>
        {isAccountOpen && (
          <motion.div
            ref={desktopAccountRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-12 z-50">
            <AccountDropdown
              onClose={() => dispatch(closeAccount())}
              onSignOut={handleSignOut}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DesktopMenuButtons;
