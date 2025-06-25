import React from "react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  image,
  price,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/catalog/${id}`);
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
            {price}
          </p>
        </div>
      </div>
    </li>
  );
};

export default ProductCard;
