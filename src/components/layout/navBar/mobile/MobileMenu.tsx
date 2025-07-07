import { NavLink } from "react-router-dom";
import {
  FaCrown,
  FaGem,
  FaShoppingBag,
  FaTruck,
  FaAddressBook,
} from "react-icons/fa";

const mobileNavItems = [
  { label: "Главная", path: "/", Icon: FaCrown },
  { label: "О нас", path: "/about-us", Icon: FaGem },
  { label: "Каталог", path: "/catalog", Icon: FaShoppingBag },
  { label: "Доставка", path: "/delivery", Icon: FaTruck },
  { label: "Контакты", path: "/contacts", Icon: FaAddressBook },
];

const MobileMenu: React.FC = () => (
  <nav className="lg:hidden fixed bottom-0 w-full bg-background border-t border-gray-700 px-1">
    <ul className="flex justify-between py-2">
      {mobileNavItems.map(({ label, path, Icon }) => (
        <li key={path} className="flex-1 text-center">
          <NavLink
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center text-[14px] transition ${
                isActive
                  ? "text-primary"
                  : "text-text-secondary hover:text-primary"
              }`
            }>
            <Icon className="text-3xl text-primary" />
            <span>{label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default MobileMenu;
