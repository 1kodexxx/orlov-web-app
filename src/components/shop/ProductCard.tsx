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

  // ---- «глобальное» знание о лайках (persist + optional sync с API)
  const { likedIds, markLiked, markUnliked } = useFavorites();
  const isLiked = likedIds.has(id) || liked; // если контекст ещё не успел подтянуть состояния – используем prop

  // ---- локальные счётчики/рейтинг для UI
  const [views] = React.useState(viewCount); // просмотры в списке не считаем
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
        markUnliked(id); // важное: фиксируем локально и сохраняем в LS
      } else {
        const res = await like(id);
        setLikes(res.likeCount);
        markLiked(id); // фиксируем локально и сохраняем в LS
      }
    } catch {
      /* можно показать toast */
    }
  };

  const handleRate = async (value: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const prev = rating;
    setRatingLocal(value);
    try {
      const res = await setRating(id, value);
      // гарантируем число, чтобы не было .toFixed is not a function
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
      className="product-card flex flex-col items-center max-w-[260px] w-full cursor-pointer"
      onClick={handleCardClick}>
      <div className="overflow-hidden bg-background-paper rounded-lg w-full relative">
        <img
          src={imageUrl || "/placeholder.png"}
          alt={name}
          className="object-cover w-full"
          loading="lazy"
        />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-2 sm:bottom-3">
          <div className="flex items-center gap-2 rounded-full bg-black/55 text-white px-3.5 py-2 backdrop-blur-sm">
            {renderStars()}
          </div>
        </div>
      </div>

      <div className="w-full mt-2 px-2 flex items-center justify-between h-8 select-none">
        <div className="inline-flex items-center gap-1.5 text-white/90">
          <AiOutlineEye size={20} />
          <span className="text-sm">{formatCount(views)}</span>
        </div>

        <button
          type="button"
          onClick={toggleLike}
          className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md ${
            isLiked ? "text-rose-400" : "text-white/90"
          }`}
          aria-label={isLiked ? "Убрать лайк" : "Поставить лайк"}>
          <HeartIcon size={20} />
          <span className="text-sm">{formatCount(likes)}</span>
        </button>
      </div>

      <div className="p-2 text-center w-full">
        <h3
          className="text-sm text-text-secondary hover:underline overflow-hidden"
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
        <p className="mt-1 text-base font-semibold text-text-primary">
          {price.toLocaleString("ru-RU")} ₽
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
