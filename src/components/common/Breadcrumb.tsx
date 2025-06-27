import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { allProducts } from "@/data/products";
import { AnimatePresence, motion } from "framer-motion";

interface BreadcrumbProps {
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

      if (index === pathnames.length - 1 && isProductPage) {
        label = productName;
      }

      return { label, href };
    }),
  ];

  // Контейнер для stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0 },
  };

  // Варианты для элементов
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <nav aria-label="Breadcrumb" className="py-2">
      <AnimatePresence mode="wait">
        <motion.ol
          key={location.pathname}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex justify-center items-center gap-2 text-sm text-text-secondary">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const displayLabel = isLast && lastLabel ? lastLabel : item.label;

            return (
              <React.Fragment key={item.href}>
                <motion.li variants={itemVariants}>
                  {isLast ? (
                    <span className="text-text-primary">{displayLabel}</span>
                  ) : (
                    <Link
                      to={item.href}
                      className="block transition-colors text-text-secondary hover:text-text-primary">
                      {displayLabel}
                    </Link>
                  )}
                </motion.li>

                {!isLast && (
                  <motion.li
                    variants={itemVariants}
                    className="rtl:rotate-180 text-text-secondary">
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
    </nav>
  );
};

export default Breadcrumb;
