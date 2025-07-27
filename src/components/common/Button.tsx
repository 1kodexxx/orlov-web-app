import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface ButtonProps {
  initialText: string;
  to?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "light" | "dark";
}

const Button: React.FC<ButtonProps> = ({
  initialText,

  to,
  onClick,
  variant = "light",
}) => {
  const isDark = variant === "dark";
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
    if (to && to.startsWith("/")) {
      navigate(to);
    }
  };

  const content = (
    <motion.div
      className="relative overflow-hidden"
      initial={{}}
      whileHover="hover"
      animate="rest"
      variants={{
        rest: { scale: 1, filter: "brightness(1)" },
        hover: {
          scale: 1.05,
          filter: "brightness(1.1)",
          transition: { duration: 0.2, ease: "easeOut" },
        },
      }}>
      <p className="flex items-center justify-center m-0">{initialText}</p>
    </motion.div>
  );

  const button = (
    <motion.button
      type="button"
      onClick={handleClick}
      className={`cursor-pointer px-6 py-3 rounded-xl font-normal transition-all duration-300 shadow-sm ${
        isDark ? "bg-[#181818] text-[#EFE393]" : "bg-[#EFE393] text-[#181818]"
      }`}
      whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.15)" }}
      whileTap={{ scale: 0.95 }}>
      {content}
    </motion.button>
  );

  if (to && (to.startsWith("http://") || to.startsWith("https://"))) {
    return (
      <Link to={to} target="_blank" rel="noopener noreferrer">
        {button}
      </Link>
    );
  }

  if (to && to.startsWith("/")) {
    return <Link to={to}>{button}</Link>;
  }

  return button;
};

export default Button;
