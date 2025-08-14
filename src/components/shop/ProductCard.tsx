import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaStar, FaRegStar } from "react-icons/fa";
import { like, unlike, setRating } from "@/features/catalog";
import { useFavorites } from "@/features/catalog/useFavorites";

interface ProductCardProps {
  id: number;
  name: string;
  imageUrl?: string;
  price: number;

  viewCount?: number;
  likeCount?: number;
  avgRating?: number; // 0..5
  liked?: boolean; // стартовое состояние для SSR/списка
  myRating?: number | null;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  imageUrl,
  price,
  viewCount = 0,
  likeCount = 0,
  avgRating = 0,
  liked = false,
  myRating = null,
}) => {
  const navigate = useNavigate();

  // ---- глобальное знание о лайках
  const { likedIds, markLiked, markUnliked } = useFavorites();
  const isLiked = likedIds.has(id) || liked;

  // ---- локальные счётчики/рейтинг для UI
  const [views] = React.useState(viewCount);
  const [likes, setLikes] = React.useState(likeCount);
  const [rating, setRatingLocal] = React.useState<number>(
    Number(myRating ?? avgRating) || 0
  );
  const [hoverVal, setHoverVal] = React.useState<number | null>(null);

  const handleCardClick = () => navigate(`/catalog/${id}`);

  const toggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (isLiked) {
        const res = await unlike(id);
        setLikes(res.likeCount);
        markUnliked(id);
      } else {
        const res = await like(id);
        setLikes(res.likeCount);
        markLiked(id);
      }
    } catch {
      /* опционально: toast */
    }
  };

  const handleRate = async (value: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const prev = rating;
    setRatingLocal(value);
    try {
      const res = await setRating(id, value);
      const next = Number.isFinite(res.myRating)
        ? res.myRating
        : Number(res.avgRating) || value;
      setRatingLocal(next);
    } catch {
      setRatingLocal(prev);
    }
  };

  const formatCount = (n: number) =>
    Intl.NumberFormat("ru-RU", {
      notation: "compact",
      compactDisplay: "short",
    }).format(Math.max(0, n));

  const HeartIcon = isLiked ? AiFillHeart : AiOutlineHeart;

  const renderStars = () => {
    const current =
      hoverVal ?? Math.round(Number.isFinite(rating) ? rating : 0);
    const arr = [1, 2, 3, 4, 5];
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {arr.map((s) =>
            s <= current ? (
              <FaStar
                key={s}
                size={18}
                className="text-yellow-400 cursor-pointer"
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  setHoverVal(s);
                }}
                onMouseLeave={(e) => {
                  e.stopPropagation();
                  setHoverVal(null);
                }}
                onClick={(e) => handleRate(s, e)}
                title={`Оценить на ${s}`}
              />
            ) : (
              <FaRegStar
                key={s}
                size={18}
                className="text-zinc-300 cursor-pointer"
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  setHoverVal(s);
                }}
                onMouseLeave={(e) => {
                  e.stopPropagation();
                  setHoverVal(null);
                }}
                onClick={(e) => handleRate(s, e)}
                title={`Оценить на ${s}`}
              />
            )
          )}
        </div>
        <span className="text-sm text-white/90">
          {(Number.isFinite(rating) ? rating : 0).toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <div
      className="product-card group w-full max-w-[310px] cursor-pointer"
      onClick={handleCardClick}>
      <div className="relative w-full rounded-xl border border-secondary/60 bg-background-paper shadow-sm transition-[box-shadow,transform] duration-200 hover:shadow-md">
        {/* === Бейджи сверху: просмотры слева, лайки справа === */}
        <div className="pointer-events-none absolute top-2 left-2 z-20">
          <div className="flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1.5 text-white backdrop-blur-sm">
            <AiOutlineEye size={16} />
            <span className="text-xs">{formatCount(views)}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={toggleLike}
          aria-label={isLiked ? "Убрать лайк" : "Поставить лайк"}
          className={`absolute top-2 right-2 z-20 inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 backdrop-blur-sm transition
            ${
              isLiked
                ? "bg-rose-500/80 text-white"
                : "bg-black/55 text-white hover:bg-black/70"
            }
          `}>
          <HeartIcon size={16} />
          <span className="text-xs">{formatCount(likes)}</span>
        </button>

        {/* === Блок изображения с фиксированным соотношением 3:4 === */}
        <div
          className="w-full overflow-hidden"
          style={{ aspectRatio: "3 / 4" }}>
          <img
            src={imageUrl || "/placeholder.png"}
            alt={name}
            loading="lazy"
            className="h-full w-full object-contain p-2 sm:p-3"
          />
        </div>

        {/* Рейтинг на фото (снизу по центру) */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-2 sm:bottom-3 z-10">
          <div className="flex items-center gap-2 rounded-full bg-black/55 text-white px-3.5 py-2 backdrop-blur-sm">
            {renderStars()}
          </div>
        </div>
      </div>

      {/* Подпись и цена */}
      <div className="p-3 text-center w-full">
        <h3
          className="text-[15px] text-text-secondary hover:underline overflow-hidden leading-snug"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            wordBreak: "break-word",
            textOverflow: "ellipsis",
          }}
          title={name}>
          {name}
        </h3>
        <p className="mt-1 text-[17px] font-semibold text-text-primary">
          {price.toLocaleString("ru-RU")} ₽
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
