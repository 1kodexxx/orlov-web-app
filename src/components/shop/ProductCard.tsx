import React from "react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: number;
  name: string;
  imageUrl?: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  imageUrl,
  price,
}) => {
  const navigate = useNavigate();
  const handleCardClick = () => navigate(`/catalog/${id}`);

  return (
    <div
      className="product-card flex flex-col items-center max-w-[260px] w-full cursor-pointer"
      onClick={handleCardClick}>
      <div className="overflow-hidden bg-background-paper rounded-lg w-full">
        <img
          src={imageUrl || "/placeholder.png"}
          alt={name}
          className="object-cover w-full"
          loading="lazy"
        />
      </div>
      <div className="mt-2 p-2 text-center w-full">
        <h3
          className="text-sm text-text-secondary hover:underline overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            wordBreak: "break-word",
            textOverflow: "ellipsis",
          }}>
          {name}
        </h3>
        <p className="mt-1 text-base font-semibold text-text-primary">
          {price.toLocaleString()} ₽
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
