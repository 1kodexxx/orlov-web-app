// src/components/layout/navBar/DesktopMenu.tsx

import { NavLink, useLocation } from "react-router-dom";
import { motion, LayoutGroup } from "framer-motion";

const navItems = [
  { label: "Главная", path: "/" },
  { label: "О нас", path: "/about-us" },
  { label: "Каталог", path: "/catalog" },
  { label: "Доставка", path: "/delivery" },
  { label: "Контакты", path: "/contacts" },
  { label: "Отзывы", path: "/reviews" },
];

const DesktopMenu: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <LayoutGroup>
      <ul className="hidden lg:flex absolute left-1/2 -translate-x-1/2 gap-4 md:gap-6 flex-wrap">
        {navItems.map(({ label, path }) => (
          <li key={path} className="relative">
            <NavLink
              to={path}
              end={path === "/"}
              className={({ isActive }) =>
                `text-xs md:text-base font-normal transition-all duration-300 ${
                  isActive
                    ? "text-primary"
                    : "text-text-secondary hover:text-primary"
                }`
              }>
              {label}
            </NavLink>

            {pathname === path && (
              <motion.span
                layoutId="nav-underline"
                className="absolute left-0 -bottom-1 h-[2px] bg-primary"
                style={{ width: "100%" }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </li>
        ))}
      </ul>
    </LayoutGroup>
  );
};

export default DesktopMenu;
