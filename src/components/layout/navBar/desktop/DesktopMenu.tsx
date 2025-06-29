// src/components/layout/navBar/DesktopMenu.tsx
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Главная", path: "/" },
  { label: "О нас", path: "/about-us" },
  { label: "Каталог", path: "/catalog" },
  { label: "Доставка", path: "/delivery" },
  { label: "Контакты", path: "/contacts" },
  { label: "Отзывы", path: "/reviews" },
];

const DesktopMenu: React.FC = () => (
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
);

export default DesktopMenu;
