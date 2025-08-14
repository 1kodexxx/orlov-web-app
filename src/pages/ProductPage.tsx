// src/pages/ProductPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "@/components/common";
import {
  BackTo,
  ProductSlider,
  ProductDetails,
  ProductNotification,
} from "@/components/shop/productPage";
import { fetchProductAndView, type ProductRow } from "@/features/catalog";

/** Преобразуем images к массиву URL для слайдера */
const toImageArray = (images?: ProductRow["images"]): string[] => {
  if (!images) return [];
  if (!Array.isArray(images) || images.length === 0) return [];
  if (typeof images[0] === "string") return images as string[];
  return (images as Array<{ url: string; position: number }>)
    .slice()
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    .map((x) => x.url);
};

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<ProductRow | null>(null);

  const [notification, setNotification] = useState<{
    variant: "success" | "error";
    title: string;
    description?: string;
  } | null>(null);

  useEffect(() => {
    let cancel = false;
    setLoading(true);

    fetchProductAndView(productId)
      .then((p) => !cancel && setProduct(p))
      .finally(() => !cancel && setLoading(false));

    return () => {
      cancel = true;
    };
  }, [productId]);

  const images = useMemo(() => toImageArray(product?.images), [product]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (!product) {
    return (
      <section className="max-w-screen-xl mx-auto px-4 py-8 sm:px-6 lg:px-8 text-text-secondary min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-normal">Товар не найден</h1>
      </section>
    );
  }

  return (
    <>
      <BackTo />

      <section className="bg-background body-font overflow-hidden min-h-[calc(100vh-4rem)] flex items-center relative">
        {notification && (
          <ProductNotification
            variant={notification.variant}
            title={notification.title}
            description={notification.description}
            onClose={() => setNotification(null)}
            onGoToCart={() => {
              navigate("/cart");
              setNotification(null);
            }}
            onContinueShopping={() => {
              navigate("/catalog");
              setNotification(null);
            }}
            showActions={notification.variant === "success"}
          />
        )}

        <div className="max-w-screen-lg mx-auto px-4 py-4 sm:px-6 sm:py-8 lg:py-3 xl:mb-20 w-full">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch">
            <div className="w-full lg:w-1/2 flex justify-center">
              <ProductSlider images={images} name={product.name} />
            </div>

            <div className="w-full lg:w-1/2 flex">
              <ProductDetails
                product={product}
                setNotification={setNotification}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductPage;
