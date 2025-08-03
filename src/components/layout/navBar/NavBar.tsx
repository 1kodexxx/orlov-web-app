import { useLocation } from "react-router-dom";
import { useRef, useEffect } from "react";
import { FaSearchDollar, FaUserTie } from "react-icons/fa";
import { BiShoppingBag } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./";
import DesktopMenu from "./desktop/DesktopMenu";
import DesktopMenuButtons from "./desktop/DesktopMenuButtons";
import MobileMenu from "./mobile/MobileMenu";
import { CartDropdown } from "./cartDropdown/";
import { SearchDropdown } from "./searchDropdown";
import { useCart } from "@/context/useCart";

// redux
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  toggleCart,
  toggleSearch,
  closeAll,
  closeCart,
  closeSearch,
  setAnimateBadge,
  setAnimatePrice,
} from "@/store/slices/navbarSlice";

const NavBar: React.FC = () => {
  const location = useLocation();
  const { cartItems } = useCart();
  const dispatch = useAppDispatch();
  const { isCartOpen, isSearchOpen, animateBadge, animatePrice } =
    useAppSelector((s) => s.navbar);

  const mobileCartRef = useRef<HTMLDivElement>(null);
  const prevTotalItemsRef = useRef<number>(0);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const handleGoToCart = () => {
    dispatch(closeCart());
  };

  // клик вне дропдаунов — закрываем оба
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        mobileCartRef.current &&
        !mobileCartRef.current.contains(e.target as Node)
      ) {
        dispatch(closeAll());
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [dispatch]);

  // анимации при увеличении количества товаров
  useEffect(() => {
    const prev = prevTotalItemsRef.current;
    if (totalItems > prev) {
      dispatch(setAnimateBadge(true));
      dispatch(setAnimatePrice(true));
      const t1 = setTimeout(() => dispatch(setAnimateBadge(false)), 300);
      const t2 = setTimeout(() => dispatch(setAnimatePrice(false)), 300);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
    prevTotalItemsRef.current = totalItems;
  }, [totalItems, dispatch]);

  // смена роутинга — закрываем всё
  useEffect(() => {
    dispatch(closeAll());
  }, [location.pathname, dispatch]);

  return (
    <header className="w-full sticky top-0 z-50 bg-background shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between relative">
        <Logo />

        {/* Десктоп-меню */}
        <DesktopMenu />
        <DesktopMenuButtons />

        {/* Мобильные иконки: поиск, корзина, профиль */}
        <div className="lg:hidden flex items-center space-x-6 text-primary">
          <FaSearchDollar
            onClick={() => dispatch(toggleSearch())}
            className="w-6 h-6 cursor-pointer hover:scale-110 transition"
          />

          <div
            className="relative flex items-center cursor-pointer"
            onClick={() => dispatch(toggleCart())}>
            <BiShoppingBag className="w-7 h-7" />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: animateBadge ? 1.15 : 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 250, damping: 16 }}
                  className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
            <motion.span
              animate={animatePrice ? { scale: 1.1 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 250, damping: 16 }}
              className="ml-1 text-sm font-medium text-[#CCCCCC]">
              {totalPrice} ₽
            </motion.span>
          </div>

          <FaUserTie className="text-2xl cursor-pointer hover:scale-110 transition" />
        </div>
      </div>

      {/* Dropdowns для мобильных иконок — только mobile */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="px-4 pb-4 relative z-50 lg:hidden">
            <SearchDropdown
              onClose={() => dispatch(closeSearch())}
              onToggleMenu={() => {}}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            ref={mobileCartRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="px-4 pb-4 lg:hidden">
            <CartDropdown
              onClose={() => dispatch(closeCart())}
              onGoToCart={handleGoToCart}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Фиксированное нижнее меню */}
      <MobileMenu />
    </header>
  );
};

export default NavBar;
