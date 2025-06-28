// src/components/layout/navBar/CartDropdown.tsx

import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import { FaTrash, FaTimes } from "react-icons/fa";
import { useRef, useEffect } from "react";

const colorOptions = [
  { name: "Жёлтый", hex: "#facc15" },
  { name: "Чёрный", hex: "#404040" },
  { name: "Зелёный", hex: "#86efac" },
  { name: "Синий", hex: "#3b82f6" },
  { name: "Красный", hex: "#f87171" },
  { name: "Фиолетовый", hex: "#a855f7" },
];

interface CartDropdownProps {
  onClose: () => void;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ onClose }) => {
  const { cartItems, removeFromCart } = useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  // Закрытие по клику вне компонента
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      className="bg-[#181818] rounded-lg shadow-lg border border-gray-700 z-50 w-96 max-w-[95vw] sm:max-w-md">
      <div className="p-4 relative">
        {/* Крестик для закрытия */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-2 right-2 text-gray-400 hover:text-white transition"
          aria-label="Закрыть">
          <FaTimes />
        </button>

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-primary">Ваша корзина</h3>
          <span className="text-sm text-gray-500">{cartItems.length} шт.</span>
        </div>

        <div className="divide-y divide-gray-600 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
          {cartItems.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              Корзина пуста
            </p>
          ) : (
            cartItems.map((item, index) => {
              const colorObj = colorOptions.find(
                (c) => c.hex === item.selectedColor
              );
              const colorName = colorObj?.name ?? item.selectedColor;

              return (
                <div
                  key={index}
                  className="flex justify-between items-start py-3">
                  <div className="flex gap-3 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 object-contain rounded"
                    />
                    <div>
                      <h4 className="font-normal text-primary mb-1 text-sm">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-300">
                        Цвет:{" "}
                        <span style={{ color: item.selectedColor }}>
                          {colorName}
                        </span>
                      </p>
                      <p className="text-sm" style={{ color: "#CCCCCC" }}>
                        Модель: {item.selectedModel}
                      </p>
                      <p className="text-sm text-gray-500">x{item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">
                      {(item.price * item.quantity).toLocaleString()} ₽
                    </p>
                    <button
                      onClick={() =>
                        removeFromCart(
                          item.slug,
                          item.selectedColor,
                          item.selectedModel
                        )
                      }
                      className="text-red-500 hover:text-red-700 mt-1"
                      aria-label="Удалить">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="font-semibold text-white">Итого:</span>
          <span className="font-bold text-lg text-primary">
            {parseFloat(totalPrice).toLocaleString()} ₽
          </span>
        </div>

        <Link
          to="/cart"
          onClick={onClose}
          className="block mt-4 bg-primary text-center text-[#181818] py-1 px-4 rounded text-sm font-normal hover:bg-opacity-90 transition">
          Перейти в корзину 🛒
        </Link>
      </div>
    </div>
  );
};

export default CartDropdown;
