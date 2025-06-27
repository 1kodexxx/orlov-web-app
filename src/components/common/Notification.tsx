import React from "react";

interface NotificationProps {
  variant?: "success" | "error" | "info" | "warning";
  title: string;
  description?: string;
  onClose?: () => void;
}

const variantStyles = {
  success: {
    bg: "bg-[#232531]",
    iconColor: "text-[#2b9875]",
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
          d="m4.5 12.75 6 6 9-13.5"
        />
      </svg>
    ),
  },
  error: {
    bg: "bg-[#232531]",
    iconColor: "text-[#d65563]",
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
          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
        />
      </svg>
    ),
  },
  info: {
    bg: "bg-[#1b1f2c]",
    iconColor: "text-blue-500",
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
    bg: "bg-[#2c241b]",
    iconColor: "text-yellow-500",
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

  return (
    <div className="flex flex-col gap-2 w-60 sm:w-72 text-[10px] sm:text-xs z-50">
      <div
        className={`cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg ${styles.bg} px-[10px]`}>
        <div className="flex gap-2">
          <div
            className={`${styles.iconColor} bg-white/5 backdrop-blur-xl p-1 rounded-lg`}>
            {styles.icon}
          </div>
          <div>
            <p className="text-white">{title}</p>
            {description && <p className="text-gray-500">{description}</p>}
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-600 hover:bg-white/10 p-1 rounded-md transition-colors ease-linear">
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
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Notification;
