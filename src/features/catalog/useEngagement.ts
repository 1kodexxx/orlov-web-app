import * as React from "react";
import { addView, like, unlike, setRating } from "./api";

/** Чтобы в одной вкладке один товар не считался многократно */
const viewedThisSession = new Set<number>();

type Initial = {
  viewCount?: number;
  likeCount?: number;
  liked?: boolean;
  avgRating?: number;
  myRating?: number;
};

type Options =
  | { mode: "immediate" } // детальная страница: засчитать сразу
  | { mode: "in-viewport"; threshold?: number }; // список: при появлении в вьюпорте

export function useEngagement(
  productId: number,
  initial: Initial = {},
  options: Options
) {
  const [views, setViews] = React.useState(initial.viewCount ?? 0);
  const [likes, setLikes] = React.useState(initial.likeCount ?? 0);
  const [liked, setLiked] = React.useState(initial.liked ?? false);
  const [avgRating, setAvgRating] = React.useState(initial.avgRating ?? 0);
  const [myRating, setMyRating] = React.useState(initial.myRating ?? 0);

  const rootRef = React.useRef<HTMLElement | null>(null);

  const markViewedOnce = React.useCallback(() => {
    if (viewedThisSession.has(productId)) return false;
    viewedThisSession.add(productId);
    return true;
  }, [productId]);

  // Просмотр
  React.useEffect(() => {
    if (options.mode === "immediate") {
      // детальная страница
      if (!markViewedOnce()) return;
      (async () => {
        try {
          const res = await addView(productId);
          setViews(res.viewCount);
        } catch {
          /* ignore */
        }
      })();
      return;
    }

    // режим списка: вьюпорт
    const el = rootRef.current;
    if (!el) return;

    let stopped = false;
    const io = new IntersectionObserver(
      async ([entry]) => {
        if (stopped) return;
        if (entry.isIntersecting && markViewedOnce()) {
          try {
            const res = await addView(productId);
            setViews(res.viewCount);
          } catch {
            /* ignore */
          }
          // можно отключить наблюдение после первого срабатывания
          stopped = true;
          io.disconnect();
        }
      },
      { threshold: options.threshold ?? 0.6 }
    );
    io.observe(el as Element);
    return () => io.disconnect();
  }, [productId, options, markViewedOnce]);

  // Лайк/анлайк
  const toggleLike = React.useCallback(async () => {
    try {
      if (liked) {
        const res = await unlike(productId);
        setLiked(res.liked);
        setLikes(res.likeCount);
      } else {
        const res = await like(productId);
        setLiked(res.liked);
        setLikes(res.likeCount);
      }
    } catch {
      /* ignore or toast */
    }
  }, [liked, productId]);

  // Рейтинг
  const rate = React.useCallback(
    async (value: number) => {
      try {
        const res = await setRating(productId, value);
        setAvgRating(res.avgRating);
        setMyRating(res.myRating);
      } catch {
        /* ignore */
      }
    },
    [productId]
  );

  return {
    // refs/состояния/действия
    rootRef, // прикрепляй к корню карточки для режима "in-viewport"
    views,
    likes,
    liked,
    avgRating,
    myRating,
    toggleLike,
    rate,
  };
}
