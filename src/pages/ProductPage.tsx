// src/pages/product/ProductPage.tsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import BackTo from "@/components/shop/productPage/BackTo";
import ProductSlider from "@/components/shop/productPage/ProductSlider";
import ProductDetails from "@/components/shop/productPage/ProductDetails";
import ProductNotification from "@/components/shop/productPage/ProductNotification";
import { Loader } from "@/components/common";

// API
import { getProduct, type ProductRow } from "@/features/catalog";

/**
 * Страница товара:
 * - грузит товар по :id
 * - прокидывает название в Breadcrumb через lastLabel
 * - до загрузки использует location.state.productName (чтобы не мигало)
 * - показывает Loader / ошибку / контент
 * - отправляет "view" (fire-and-forget), когда товар успешно загружен
 */
const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // const location = useLocation() as { state?: { productName?: string } };

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [product, setProduct] = React.useState<ProductRow | null>(null);

  const [notification, setNotification] = React.useState<{
    variant: "success" | "error";
    title: string;
    description?: string;
  } | null>(null);

  // Загружаем товар
  React.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setProduct(null);

    const pid = Number(id);
    if (!Number.isFinite(pid) || pid <= 0) {
      setError("Некорректный идентификатор товара");
      setLoading(false);
      return;
    }

    getProduct(pid)
      .then((data) => {
        if (cancelled) return;
        setProduct(data);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        const msg = e instanceof Error ? e.message : String(e);
        setError(msg || "Не удалось загрузить товар");
      })
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [id]);

  // Обновим title вкладки, когда знаем имя
  // React.useEffect(() => {
  //   const prev = document.title;
  //   const name = product?.name ?? location.state?.productName;
  //   if (name) document.title = `${name} — ORLOV BRAND`;
  //   return () => {
  //     document.title = prev;
  //   };
  // }, [product?.name, location.state?.productName]);

  // Отправим "просмотр" после успешной загрузки (fire-and-forget)
  React.useEffect(() => {
    if (!product?.product_id) return;
    // Если у тебя есть обёртка addView из features/catalog — используй её.
    // Ниже — максимально безопасный fire-and-forget:
    void fetch(`/catalog/${product.product_id}/view`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
    }).catch(() => {});
  }, [product?.product_id]);

  return (
    <>
      <BackTo />

      <section className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-16 py-4">
        {loading && (
          <div className="py-16 flex justify-center">
            <Loader />
          </div>
        )}

        {!loading && error && (
          <div className="py-16 text-center">
            <div className="text-red-400 text-lg mb-4">Товар не найден</div>
            <button
              className="underline text-primary"
              onClick={() => navigate("/catalog", { replace: true })}>
              Вернуться в каталог
            </button>
          </div>
        )}

        {!loading && !error && product && (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 flex items-center justify-center">
              {/* С бэка уже приходят нормализованные string[] (мы это сделали в сервисе) */}
              <ProductSlider
                images={(product.images as unknown as string[]) ?? []}
                name={product.name}
              />
            </div>

            <ProductDetails
              product={product}
              setNotification={setNotification}
            />
          </div>
        )}
      </section>

      {notification && (
        <ProductNotification
          variant={notification.variant}
          title={notification.title}
          description={notification.description}
          onClose={() => setNotification(null)}
        />
      )}
    </>
  );
};

export default ProductPage;
