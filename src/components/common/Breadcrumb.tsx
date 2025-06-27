import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { allProducts } from "@/data/products";

interface BreadcrumbProps {
  /** Если нужно вручную заменить последний элемент хлебных крошек */
  lastLabel?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ lastLabel }) => {
  const location = useLocation();
  const { id } = useParams();

  const pathnames = location.pathname.split("/").filter((x) => x);

  const labelMap: { [key: string]: string } = {
    "": "Главная",
    "about-us": "О нас",
    catalog: "Каталог",
    contacts: "Контакты",
    delivery: "Доставка",
    reviews: "Отзывы",
    cart: "Корзина",
  };

  const isProductPage = location.pathname.startsWith("/catalog/") && id;

  // Если на странице товара — ищем товар по slug
  let productName = "";
  if (isProductPage) {
    const product = allProducts.find((p) => p.slug === id);
    productName = product ? product.name : "Товар не найден";
  }

  const items = [
    { label: "Главная", href: "/" },
    ...pathnames.map((value, index) => {
      const href = "/" + pathnames.slice(0, index + 1).join("/");
      let label = labelMap[value] || value;

      // Если это последний элемент и мы на странице товара — показываем русское название
      if (index === pathnames.length - 1 && isProductPage) {
        label = productName;
      }

      return { label, href };
    }),
  ];

  return (
    <nav aria-label="Breadcrumb" className="py-2">
      <ol className="flex justify-center items-center gap-2 text-sm text-text-secondary">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          // Если передан lastLabel — он имеет приоритет
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
