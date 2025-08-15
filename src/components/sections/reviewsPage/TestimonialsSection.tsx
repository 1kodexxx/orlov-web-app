// src/sections/TestimonialsSection.tsx
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  useCompanyReviews,
  useCompanyReviewsStats,
} from "@/features/company-reviews/hooks";
import type { CompanyReview } from "@/features/company-reviews/types";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const PAGE_SIZE = 6;

const TestimonialsSection: React.FC = () => {
  const [page, setPage] = useState(1);
  const [allItems, setAllItems] = useState<CompanyReview[]>([]);
  const seenIdsRef = useRef<Set<string>>(new Set());
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Загружаем текущую страницу
  const { data, loading, error } = useCompanyReviews({
    page,
    limit: PAGE_SIZE,
  });

  const { data: stats } = useCompanyReviewsStats();

  // Добавляем новые карточки к уже имеющимся
  useEffect(() => {
    if (data?.items?.length) {
      setAllItems((prev) => {
        const ids = new Set(prev.map((it) => String(it.id)));
        const filtered = data.items.filter((it) => !ids.has(String(it.id)));
        filtered.forEach((it) => seenIdsRef.current.add(String(it.id)));
        return [...prev, ...filtered];
      });
    }
  }, [data?.items]);

  // Intersection Observer для бесконечной подгрузки
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !loading && data?.items?.length) {
          setPage((p) => p + 1);
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loading, data?.items?.length]);

  return (
    <motion.section
      className="w-full bg-background py-16 px-4 flex flex-col items-center"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}>
      {/* Заголовок */}
      <div className="w-full max-w-[1245px] mx-auto text-center mb-8">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-primary mb-3"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}>
          Почему выбирают нас?
        </motion.h2>

        <motion.p
          className="text-text-secondary max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}>
          Узнайте, почему выбор Orlov Brand — лучшее решение для вас.
        </motion.p>

        {typeof stats?.reviews_count === "number" && (
          <motion.div
            className="mt-4 inline-flex items-center gap-3 rounded-full border border-secondary/60 bg-background-paper/60 px-4 py-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}>
            <span className="text-sm text-text-secondary">
              Отзывов:{" "}
              <span className="text-text-primary font-medium">
                {stats.reviews_count}
              </span>
            </span>
          </motion.div>
        )}
      </div>

      {/* Ошибка */}
      {error && (
        <div className="w-full max-w-[1244px] mx-auto text-center mb-6">
          <div className="inline-flex items-center gap-3 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-red-200">
            Не удалось загрузить отзывы: {error}
          </div>
        </div>
      )}

      {/* Скелетоны */}
      {loading && allItems.length === 0 && (
        <div className="w-full max-w-[1244px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div
              key={i}
              className="h-48 rounded-2xl bg-background-paper/70 border border-secondary animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Список отзывов */}
      {allItems.length > 0 && (
        <motion.div
          layout
          className="w-full max-w-[1244px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {allItems.map((t) => {
            const isNew = !seenIdsRef.current.has(String(t.id));
            const role = t.author.headline || t.author.organization || "Клиент";
            return (
              <motion.div
                layout
                key={t.id}
                className="bg-background-paper rounded-2xl shadow p-6 flex flex-col justify-between h-full cursor-pointer border border-secondary/60"
                initial={isNew ? { opacity: 0, y: 14, scale: 0.98 } : false}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 26,
                  mass: 0.6,
                }}
                whileHover={{
                  scale: 1.03,
                  y: -4,
                  filter: "brightness(1.06)",
                }}
                whileTap={{ scale: 0.985 }}>
                <p className="mb-5 text-gray-300 leading-relaxed">“{t.text}”</p>
                <div className="flex items-center gap-4 mt-auto">
                  {t.author.avatarUrl ? (
                    <img
                      src={t.author.avatarUrl}
                      alt={t.author.fullName || "Отзыв"}
                      className="w-12 h-12 rounded-full object-cover border border-secondary"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full grid place-items-center bg-[#2A2A2A] text-sm font-semibold text-gray-200 border border-secondary">
                      {(t.author.fullName || "U")
                        .split(" ")
                        .slice(0, 2)
                        .map((s) => s[0])
                        .join("")
                        .toUpperCase() || "U"}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-white">
                      {t.author.fullName || "Пользователь"}
                    </p>
                    <p className="text-sm text-text-primary">{role}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Лоадер для бесконечного скролла */}
      <div ref={loaderRef} className="h-10 mt-8"></div>

      {!loading && allItems.length === 0 && !error && (
        <div className="w-full max-w-[1244px] mx-auto text-center text-text-secondary">
          Отзывов пока нет.
        </div>
      )}
    </motion.section>
  );
};

export default TestimonialsSection;
