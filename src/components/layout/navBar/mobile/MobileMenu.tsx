import { NavLink } from "react-router-dom";
import { FaCrown, FaGem, FaLock, FaTruck, FaAddressBook } from "react-icons/fa";

const mobileNavItems = [
  { label: "Главная", path: "/", Icon: FaCrown },
  { label: "О нас", path: "/about-us", Icon: FaGem },
  { label: "Каталог", path: "/catalog", Icon: FaLock },
  { label: "Доставка", path: "/delivery", Icon: FaTruck },
  { label: "Контакты", path: "/contacts", Icon: FaAddressBook },
];

const MobileMenu: React.FC = () => (
  <nav className="lg:hidden fixed bottom-0 w-full bg-background border-t border-gray-700">
    <ul className="flex justify-around py-2">
      {mobileNavItems.map(({ label, path, Icon }) => (
        <li key={path}>
          <NavLink
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs transition ${
                isActive
                  ? "text-primary font-semibold"
                  : "text-text-secondary hover:text-primary"
              }`
            }>
            <Icon className="text-2xl mb-1" />
            <span>{label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default MobileMenu;
