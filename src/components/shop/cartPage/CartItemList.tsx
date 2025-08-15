import { motion } from "framer-motion";
import CartItem from "./CartItem";
import { useCart } from "@/context/useCart";

// Тип элемента корзины берём из контекста
export type CartItemEl = ReturnType<typeof useCart>["cartItems"][number];

interface CartItemListProps {
  cartItems: CartItemEl[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, when: "beforeChildren" },
  },
};

const keyFrom = (i: CartItemEl) =>
  `${i.slug}-${i.selectedColor}-${i.selectedModel}`;

export default function CartItemList({ cartItems }: CartItemListProps) {
  return (
    <motion.ul className="flex flex-col" variants={containerVariants}>
      {cartItems.map((item) => (
        <CartItem key={keyFrom(item)} item={item} />
      ))}
    </motion.ul>
  );
}
