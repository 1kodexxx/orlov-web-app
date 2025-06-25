import React from "react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  slug: string;
  name: string;
  image: string;
  price: number; // цена должна быть number
}

const ProductCard: React.FC<ProductCardProps> = ({
  slug,
  name,
  image,
  price,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/catalog/${slug}`);
  };

  return (
    <li
      className="flex flex-col items-center max-w-[260px] w-full cursor-pointer"
      onClick={handleCardClick}>
      <div className="flex flex-col items-center">
        <div className="overflow-hidden bg-background-paper rounded-lg">
          <img src={image} alt={name} className="object-cover w-full" />
        </div>

        <div className="mt-2 p-2 text-center">
          <h3 className="text-sm text-text-secondary hover:underline truncate">
            {name}
          </h3>
          <p className="mt-1 text-base font-semibold text-text-primary">
            {price.toLocaleString()} ₽
          </p>
        </div>
      </div>
    </li>
  );
};

export default ProductCard;
