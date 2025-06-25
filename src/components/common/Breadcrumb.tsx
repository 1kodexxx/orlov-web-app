// src/components/common/Breadcrumb.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

interface BreadcrumbProps {
  /** Если нужно заменить текст последнего элемента хлебных крошек */
  lastLabel?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ lastLabel }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const labelMap: { [key: string]: string } = {
    "": "Главная",
    "about-us": "О нас",
    catalog: "Каталог",
    contacts: "Контакты",
    delivery: "Доставка",
    reviews: "Отзывы",
    // и т.д.
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
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          // если последняя и передан override:
          const displayLabel = isLast && lastLabel ? lastLabel : item.label;

          return (
            <React.Fragment key={item.href}>
              <li>
                {isLast ? (
                  <span className="text-text-primary">{displayLabel}</span>
                ) : (
                  <Link
                    to={item.href}
                    className="block transition-colors text-text-secondary hover:text-text-primary">
                    {displayLabel}
                  </Link>
                )}
              </li>
              {!isLast && (
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
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
