import { useEffect, useMemo, useState } from "react";

type ImgObj = { url?: string; position?: number | null } | null | undefined;
type ImgInput = Array<string | ImgObj>;

interface ProductSliderProps {
  images: ImgInput | undefined; // ← теперь безопасно принимаем разные форматы
  name: string;
}

/** Нормализуем входные изображения к уникальному массиву URL, отсортированному по position */
function normalizeImages(images: ImgInput | undefined): string[] {
  if (!images || images.length === 0) return [];
  // Если это массив объектов — отсортируем по position и возьмём url
  const asObjs = images.every((x) => typeof x === "object");
  let urls: string[];

  if (asObjs) {
    const objs = (images as ImgObj[])
      .filter(Boolean)
      .map((x) => ({
        url: (x as ImgObj)?.url?.trim() || "",
        pos: (x as ImgObj)?.position ?? 0,
      }))
      .filter((x) => !!x.url);
    objs.sort((a, b) => (a.pos ?? 0) - (b.pos ?? 0));
    urls = objs.map((o) => o.url);
  } else {
    urls = (images as (string | ImgObj)[])
      .map((x) =>
        typeof x === "string" ? x.trim() : (x as ImgObj)?.url?.trim() || ""
      )
      .filter((u) => !!u);
  }

  // дедупликация, сохраняем первый порядок
  const seen = new Set<string>();
  const unique = urls.filter((u) => {
    if (seen.has(u)) return false;
    seen.add(u);
    return true;
  });

  return unique;
}

export default function ProductSlider({ images, name }: ProductSliderProps) {
  const slides = useMemo(() => {
    const arr = normalizeImages(images);
    return arr.length > 0 ? arr : ["/placeholder.png"];
  }, [images]);

  const [index, setIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // если после нормализации текущий индекс вне диапазона — вернёмся к 0
    if (index >= slides.length) setIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const prev = () =>
    setIndex((idx) => (idx + slides.length - 1) % slides.length);
  const next = () => setIndex((idx) => (idx + 1) % slides.length);

  return (
    <div
      className={`relative overflow-hidden select-none flex items-center justify-center max-w-[395px] max-h-[600px] w-full transition-opacity duration-700 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onMouseDown={(e) => setStartX(e.clientX)}
      onMouseUp={(e) => {
        const diff = e.clientX - startX;
        if (diff > 50) prev();
        else if (diff < -50) next();
      }}
      onTouchStart={(e) => setStartX(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const diff = e.changedTouches[0].clientX - startX;
        if (diff > 50) prev();
        else if (diff < -50) next();
      }}>
      <div
        className="flex transition-transform duration-300 w-full h-full"
        style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((url, i) => (
          <img
            key={`${url}#${i}`} // ключ включает индекс, чтобы не мигал при одинаковых url
            src={url}
            alt={`${name} ${i + 1}`}
            className="w-full h-full object-contain object-center flex-shrink-0"
            loading="lazy"
          />
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-background-paper bg-opacity-60 hover:bg-opacity-90 p-2 rounded-full"
            aria-label="Previous slide">
            <svg
              className="w-5 h-5 text-text-secondary"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={next}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-background-paper bg-opacity-60 hover:bg-opacity-90 p-2 rounded-full"
            aria-label="Next slide">
            <svg
              className="w-5 h-5 text-text-secondary"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
