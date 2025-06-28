import React, { useEffect, useState } from "react";

type VariantType = "success" | "error";

interface VariantStyle {
  border: string;
  bg: string;
  iconColor: string;
  titleColor: string;
  icon: React.ReactElement;
}

interface NotificationProps {
  variant?: VariantType;
  title: string;
  description?: string;
  onClose?: () => void;
  onGoToCart?: () => void;
  onContinueShopping?: () => void;
  showActions?: boolean; // Показывать ли кнопки (только в success)
}

const variantStyles: Record<VariantType, VariantStyle> = {
  success: {
    border: "border-[#EFE393]",
    bg: "bg-[#222222]",
    iconColor: "text-[#EFE393]",
    titleColor: "text-[#EFE393]",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  error: {
    border: "border-red-400",
    bg: "bg-[#222222]",
    iconColor: "text-red-400",
    titleColor: "text-red-400",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0Zm-9 3.75h.008v.008H12v-.008Z"
        />
      </svg>
    ),
  },
};

const ProductNotification: React.FC<NotificationProps> = ({
  variant = "success",
  title,
  description,
  onClose,
  onGoToCart,
  onContinueShopping,
  showActions = true,
}) => {
  const styles = variantStyles[variant];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      role="alert"
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-96 rounded-lg border ${
        styles.border
      } ${styles.bg} p-4 shadow-lg transition-all duration-500 ease-out ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}>
      <div className="flex items-start gap-4">
        <div className={styles.iconColor}>{styles.icon}</div>

        <div className="flex-1">
          <strong className={`font-medium ${styles.titleColor}`}>
            {title}
          </strong>

          {description && (
            <p
              className="mt-0.5 text-sm text-[#CCCCCC]"
              dangerouslySetInnerHTML={{ __html: description }}></p>
          )}

          {variant === "success" && showActions && (
            <div className="mt-3 flex items-center gap-4">
              <button
                type="button"
                onClick={onContinueShopping}
                className="flex-1 rounded border border-transparent px-3 py-2 text-sm font-medium text-[#EFE393] transition-colors hover:bg-[#2C2C2C] text-center">
                Вернуться в каталог
              </button>

              <button
                type="button"
                onClick={onGoToCart}
                className="flex-1 rounded border border-[#EFE393] px-3 py-2 text-sm font-medium text-[#EFE393] transition-colors hover:bg-[#2C2C2C] text-center">
                Перейти в корзину
              </button>
            </div>
          )}
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="-m-3 rounded-full p-1.5 text-[#CCCCCC] transition-colors hover:bg-[#2C2C2C] hover:text-[#EFE393]"
            type="button"
            aria-label="Dismiss alert">
            <span className="sr-only">Dismiss popup</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductNotification;
