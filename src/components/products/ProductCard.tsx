import React from "react";

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, image, price }) => {
  return (
    <li className="flex flex-col items-center max-w-[260px] w-full">
      <a className="flex flex-col items-center">
        <div className="overflow-hidden bg-background-paper">
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
      </a>
    </li>
  );
};

export default ProductCard;
