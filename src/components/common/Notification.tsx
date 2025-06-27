import React, { useEffect, useState } from "react";

interface NotificationProps {
  variant?: "success" | "error" | "info" | "warning";
  title: string;
  description?: string;
  onClose?: () => void;
}

const variantStyles = {
  success: {
    border: "border-[#EFE393]",
    bg: "bg-[#222222]",
    iconColor: "text-[#EFE393]",
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
  info: {
    border: "border-blue-400",
    bg: "bg-[#222222]",
    iconColor: "text-blue-400",
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
          d="M11.25 9V6.75m0 6v-2.25m0 6h.008v.008H11.25V18zM12 21a9 9 0 100-18 9 9 0 000 18z"
        />
      </svg>
    ),
  },
  warning: {
    border: "border-yellow-400",
    bg: "bg-[#222222]",
    iconColor: "text-yellow-400",
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
          d="M12 9v3m0 3h.01M21 12A9 9 0 1112 3a9 9 0 019 9z"
        />
      </svg>
    ),
  },
};

const Notification: React.FC<NotificationProps> = ({
  variant = "success",
  title,
  description,
  onClose,
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
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-80 rounded-lg border ${
        styles.border
      } ${styles.bg} p-4 shadow-lg transition-all duration-500 ease-out ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
      style={{ pointerEvents: "auto" }} // позволяет взаимодействовать, если поверх чего-то
    >
      <div className="flex items-start gap-4">
        <div className={styles.iconColor}>{styles.icon}</div>

        <div className="flex-1">
          <strong className="font-medium text-[#EFE393]">{title}</strong>

          {description && (
            <p className="mt-0.5 text-sm text-[#CCCCCC]">{description}</p>
          )}
        </div>

        {onClose && (
          <button
            className="-m-3 rounded-full p-1.5 text-[#CCCCCC] transition-colors hover:bg-[#2C2C2C] hover:text-[#EFE393]"
            type="button"
            aria-label="Dismiss alert"
            onClick={onClose}>
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

export default Notification;
