// src/components/shop/productPage/Breadcrumb.tsx
import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

interface BreadcrumbProps {
  /** Явная подпись последней крошки (например, имя товара) */
  lastLabel?: string;
}

const labelMap: Record<string, string> = {
  "": "Главная",
  "about-us": "О нас",
  catalog: "Каталог",
  contacts: "Контакты",
  delivery: "Доставка",
  reviews: "Отзывы",
  cart: "Корзина",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  exit: { opacity: 0 },
};
const itemVariants = {
  hidden: { opacity: 0, y: -5 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ lastLabel }) => {
  const location = useLocation();
  const { id } = useParams();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const isProductPage = location.pathname.startsWith("/catalog/") && id;

  // источник правды для имени товара:
  // 1) явно переданный lastLabel из страницы товара
  // 2) имя из location.state.productName, которое прокинули при navigate
  // 3) пока ничего не знаем — показываем «Загрузка…», а не «Товар не найден»
  const productNameFromState = (
    location.state as { productName?: string } | null
  )?.productName;
  const productCrumbLabel = lastLabel ?? productNameFromState ?? "Загрузка…";

  const items = [
    { label: "Главная", href: "/" },
    ...pathnames.map((segment, index) => {
      const href = "/" + pathnames.slice(0, index + 1).join("/");
      let label = labelMap[segment] || segment;

      if (index === pathnames.length - 1 && isProductPage) {
        label = productCrumbLabel;
      }
      return { label, href };
    }),
  ];

  return (
    <nav aria-label="Breadcrumb" className="py-2">
      <div className="flex justify-center">
        <AnimatePresence mode="wait">
          <motion.ol
            key={
              location.pathname +
              String(lastLabel ?? productNameFromState ?? "")
            }
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="inline-flex flex-wrap justify-center gap-2 text-sm text-text-secondary">
            {items.map((item, idx) => {
              const isLast = idx === items.length - 1;
              const displayLabel = isLast && lastLabel ? lastLabel : item.label;

              return (
                <React.Fragment key={`${item.href}-${idx}`}>
                  <motion.li variants={itemVariants} className="flex-shrink-0">
                    {isLast ? (
                      <span className="text-text-primary">{displayLabel}</span>
                    ) : (
                      <Link
                        to={item.href}
                        className="block truncate hover:text-text-primary transition-colors max-w-xs">
                        {displayLabel}
                      </Link>
                    )}
                  </motion.li>

                  {!isLast && (
                    <motion.li
                      variants={itemVariants}
                      className="flex-shrink-0 text-text-secondary">
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
                    </motion.li>
                  )}
                </React.Fragment>
              );
            })}
          </motion.ol>
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Breadcrumb;
