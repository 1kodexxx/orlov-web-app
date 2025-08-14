// src/components/shop/ProductsList.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Loader } from "@/components/common";
import { motion, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "react-router-dom";
import { getCatalog, type ProductRow, type SortKey } from "@/features/catalog";
import ProductCard from "./ProductCard";

interface ProductsListProps {
  itemsPerPage?: number;
}

const pickImage = (images?: ProductRow["images"]) => {
  if (!images) return undefined;
  if (Array.isArray(images)) {
    if (images.length === 0) return undefined;
    if (typeof images[0] === "string") return images[0] as string;
    const arr = images as Array<{ url: string; position: number }>;
    return [...arr].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))[0]
      ?.url;
  }
  return undefined;
};

const mapSortFromUI = (ui: string): SortKey | undefined => {
  switch (ui) {
    case "Title, DESC":
      return "name_desc";
    case "Title, ASC":
      return "name_asc";
    case "Price, DESC":
      return "price_desc";
    case "Price, ASC":
      return "price_asc";
    case "Newest":
      return "newest";
    case "Likes":
      return "likes_desc";
    case "Views":
      return "views_desc";
    case "Rating, DESC":
      return "rating_desc";
    case "Rating, ASC":
      return "rating_asc";
    default:
      return undefined; // relevance by default
  }
};

const AnimatedProductCard: React.FC<{ product: ProductRow; index: number }> = ({
  product,
  index,
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const variants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.06, duration: 0.45, ease: "easeOut" },
    }),
    hover: {
      scale: 1.03,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  const imageUrl = pickImage(product.images) ?? "/placeholder.png";

  return (
    <motion.li
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover="hover"
      variants={variants}
      custom={index}
      className="origin-center">
      <ProductCard
        id={product.product_id}
        name={product.name}
        imageUrl={imageUrl}
        price={product.price}
        viewCount={product.view_count}
        likeCount={product.like_count}
        avgRating={product.avg_rating}
      />
    </motion.li>
  );
};

const ProductsList: React.FC<ProductsListProps> = ({ itemsPerPage = 12 }) => {
  const [sp, setSp] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<ProductRow[]>([]);
  const [page, setPage] = useState<number>(Number(sp.get("page") || 1));
  const [pages, setPages] = useState<number>(1);

  const query = useMemo(() => {
    const q = sp.get("q") || undefined;
    const category = sp.get("category") || "";
    const materials = (sp.get("materials") || "").split(",").filter(Boolean);
    const collections = (sp.get("collections") || "")
      .split(",")
      .filter(Boolean);
    const popularity = (sp.get("popularity") || "").split(",").filter(Boolean);
    const priceMin = sp.get("priceMin")
      ? Number(sp.get("priceMin"))
      : undefined;
    const priceMax = sp.get("priceMax")
      ? Number(sp.get("priceMax"))
      : undefined;
    const sort = mapSortFromUI(sp.get("sort") || "") ?? undefined;
    const categories = category ? [category] : [];
    return {
      q,
      categories,
      materials,
      collections,
      popularity,
      priceMin,
      priceMax,
      sort,
    };
  }, [sp]);

  useEffect(() => {
    let canceled = false;
    setIsLoading(true);

    getCatalog({ page, limit: itemsPerPage, ...query })
      .then((res) => {
        if (canceled) return;
        setItems(res.items);
        setPages(res.pages);
      })
      .finally(() => !canceled && setIsLoading(false));

    return () => {
      canceled = true;
    };
  }, [page, itemsPerPage, query]);

  // если страница вышла за пределы — перейти на 1 и убрать параметр из URL
  useEffect(() => {
    if (!isLoading && page > pages) {
      setPage(1);
      sp.delete("page"); // не пишем page=1
      setSp(sp, { replace: true });
    }
  }, [isLoading, page, pages, setSp, sp]);

  const handlePageChange = (next: number) => {
    if (next < 1 || next > pages) return;
    setPage(next);
    if (next === 1) sp.delete("page");
    else sp.set("page", String(next));
    setSp(sp, { replace: true });
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const showPagination = pages > 1;

  return (
    <section className="text-text-secondary bg-background body-font py-0">
      <div className="max-w-screen-xl mx-auto px-4 pb-32 min-h-[70vh] flex flex-col justify-center">
        <div className="min-h-[50vh] flex flex-col justify-center items-center">
          {isLoading ? (
            <Loader />
          ) : items.length > 0 ? (
            <ul
              className="
                mt-4 grid
                grid-cols-2 md:grid-cols-3 xl:grid-cols-4
                gap-x-6 xl:gap-x-8 gap-y-12
                justify-items-center
              ">
              {items.map((p, index) => (
                <AnimatedProductCard
                  key={p.product_id}
                  product={p}
                  index={index}
                />
              ))}
            </ul>
          ) : (
            <div className="text-center text-lg text-text-secondary">
              Ничего не найдено
            </div>
          )}
        </div>

        {!isLoading && showPagination && (
          <ol className="mt-8 flex justify-center gap-2 text-xs font-medium">
            <li>
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-secondary hover:bg-secondary hover:text-background transition disabled:opacity-50">
                ‹
              </button>
            </li>

            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <li key={p}>
                <button
                  onClick={() => handlePageChange(p)}
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-sm border ${
                    p === page
                      ? "bg-[#EFE393] text-black border-[#EFE393]"
                      : "border-secondary hover:bg-secondary hover:text-background transition"
                  }`}>
                  {p}
                </button>
              </li>
            ))}

            <li>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === pages}
                className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-secondary hover:bg-secondary hover:text-background transition disabled:opacity-50">
                ›
              </button>
            </li>
          </ol>
        )}
      </div>
    </section>
  );
};

export default ProductsList;
