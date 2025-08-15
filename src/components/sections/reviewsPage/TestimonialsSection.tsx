// src/sections/TestimonialsSection.tsx
import React, { useMemo, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  useCompanyReviews,
  useCompanyReviewsStats,
} from "@/features/company-reviews/hooks";
import type { CompanyReview } from "@/features/company-reviews/types";

/* ===== Анимации ===== */
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const INITIAL_LIMIT = 9;
const LOAD_MORE_STEP = 9;

// утилита: дождаться следующего кадра, чтобы измерить DOM после рендера
const raf = () =>
  new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

const TestimonialsSection: React.FC = () => {
  // Берём отзывы с начальным лимитом 9
  const { data, loading, error, reload } = useCompanyReviews({
    page: 1,
    limit: INITIAL_LIMIT,
  });

  // Статистика — используем только количество отзывов
  const { data: stats } = useCompanyReviewsStats();

  const items: CompanyReview[] = data?.items ?? [];
  const total = stats?.reviews_count ?? data?.total ?? 0;

  // узел-якорь (рядом с кнопкой «Показать ещё») — фиксируем скролл
  const anchorRef = useRef<HTMLDivElement | null>(null);

  // Множество уже «увиденных» карточек, чтобы красиво анимировать только новые
  const seenIdsRef = useRef<Set<string>>(new Set());

  // При каждом изменении списка отмечаем увиденные id
  useEffect(() => {
    const s = seenIdsRef.current;
    for (const it of items) s.add(String(it.id));
  }, [items]);

  // Можно ли показать ещё (если знаем total — ориентируемся на него)
  const canLoadMore = useMemo(() => {
    if (total > 0) return items.length < total;
    return true; // если total неизвестен — позволяем пытаться грузить ещё
  }, [items.length, total]);

  // Обновить, не теряя уже видимые карточки
  const safeReload = useCallback(() => {
    const desiredLimit = Math.max(items.length, INITIAL_LIMIT);
    reload({ page: 1, limit: desiredLimit });
  }, [items.length, reload]);

  // Догрузить ещё N карточек без прыжка скролла
  const loadMore = useCallback(async () => {
    const desiredLimit = Math.max(items.length + LOAD_MORE_STEP, INITIAL_LIMIT);

    // 1) запоминаем положение якоря относительно вьюпорта
    const prevTop =
      anchorRef.current?.getBoundingClientRect().top ?? window.innerHeight;

    // 2) перезагружаем с большим лимитом
    await reload({ page: 1, limit: desiredLimit });

    // 3) ждём кадр, чтобы DOM обновился, меряем новое положение
    await raf();
    const nextTop =
      anchorRef.current?.getBoundingClientRect().top ?? window.innerHeight;

    // 4) прокручиваем на разницу — кнопка остаётся на месте
    const delta = nextTop - prevTop;
    if (Math.abs(delta) > 1) {
      window.scrollBy({ top: delta });
    }
  }, [items.length, reload]);

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

        {/* мини-статистика — только количество */}
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
            <button
              onClick={safeReload}
              className="ml-3 rounded bg-primary text-primary-contrast px-3 py-1 text-sm hover:bg-[#e6d878]">
              Повторить
            </button>
          </div>
        </div>
      )}

      {/* Скелетоны */}
      {loading && !items.length && (
        <div className="w-full max-w-[1244px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-48 rounded-2xl bg-background-paper/70 border border-secondary animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Список отзывов */}
      {!loading && items.length > 0 && (
        <>
          {/* layout на контейнере — плавная перестройка сетки */}
          <motion.div
            layout
            className="w-full max-w-[1244px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            {items.map((t: CompanyReview) => {
              const role =
                t.author.headline || t.author.organization || "Клиент";
              const idStr = String(t.id);
              const isNew = !seenIdsRef.current.has(idStr);

              return (
                <motion.div
                  layout
                  key={idStr}
                  className="bg-background-paper rounded-2xl shadow p-6 flex flex-col justify-between h-full cursor-pointer border border-secondary/60"
                  // для уже виденных карточек initial пустой, чтобы не мигали
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
                  <p className="mb-5 text-gray-300 leading-relaxed">
                    “{t.text}”
                  </p>

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

          {/* Управление списком: якорь + кнопка «Показать ещё» */}
          <div
            ref={anchorRef}
            className="w-full max-w-[1244px] mx-auto flex justify-center mt-10">
            {canLoadMore && (
              <button
                onClick={loadMore}
                disabled={loading}
                className="rounded-lg border border-secondary bg-background-paper px-5 py-2.5 text-sm text-white hover:bg-[#2a2a2a] disabled:opacity-60">
                Показать ещё
              </button>
            )}
          </div>
        </>
      )}

      {/* Пусто */}
      {!loading && !items.length && !error && (
        <div className="w-full max-w-[1244px] mx-auto text-center text-text-secondary">
          Отзывов пока нет.
        </div>
      )}
    </motion.section>
  );
};

export default TestimonialsSection;
