import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { like, unlike } from "@/features/catalog";
import { useFavorites } from "@/features/catalog/useFavorites";

interface ProductCardProps {
  id: number;
  name: string;
  imageUrl?: string;
  price: number;

  viewCount?: number;
  likeCount?: number;

  /** ниже оставлены для совместимости с существующими вызовами, но не используются */
  avgRating?: number;
  liked?: boolean;
  myRating?: number | null;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  imageUrl,
  price,
  viewCount = 0,
  likeCount = 0,
  liked = false,
}) => {
  const navigate = useNavigate();

  // глобальное знание о лайках
  const { likedIds, markLiked, markUnliked } = useFavorites();
  const isLiked = likedIds.has(id) || liked;

  // локальные счётчики для UI
  const [views] = React.useState(viewCount);
  const [likes, setLikes] = React.useState(likeCount);

  // ProductCard.tsx
  const handleCardClick = () =>
    navigate(`/catalog/${id}`, { state: { productName: name } });

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

  const formatCount = (n: number) =>
    Intl.NumberFormat("ru-RU", {
      notation: "compact",
      compactDisplay: "short",
    }).format(Math.max(0, n));

  const HeartIcon = isLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <div
      className="product-card group w-full max-w-[310px] cursor-pointer"
      onClick={handleCardClick}>
      <div className="relative w-full rounded-xl border border-secondary/60 bg-background-paper shadow-sm transition-[box-shadow,transform] duration-200 hover:shadow-md">
        {/* Бейджи сверху: просмотры слева, лайки справа */}
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

        {/* Изображение c фиксированным соотношением 3:4 */}
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
