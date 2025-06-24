import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb: React.FC = () => {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter((x) => x);

  const labelMap: { [key: string]: string } = {
    "": "Главная",
    "about-us": "О нас",
    catalog: "Каталог",
    contacts: "Контакты",
    delivery: "Доставка",
    reviews: "Отзывы",
    product: "Товар",
    category: "Категория",
  };

  const items = [
    { label: "Главная", href: "/" },
    ...pathnames.map((value, index) => {
      const href = "/" + pathnames.slice(0, index + 1).join("/");
      return { label: labelMap[value] || value, href };
    }),
  ];

  return (
    <nav aria-label="Breadcrumb" className="py-2">
      <ol className="flex justify-center items-center gap-2 text-sm text-text-secondary">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li>
              <Link
                to={item.href}
                className="block transition-colors text-text-secondary hover:text-text-primary">
                {item.label}
              </Link>
            </li>

            {index < items.length - 1 && (
              <li className="rtl:rotate-180 text-text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 20.247L15 3.747"
                  />
                </svg>
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
