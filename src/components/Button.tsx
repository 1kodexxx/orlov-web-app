import { Link } from "react-router-dom";

interface ButtonProps {
  initialText: string;
  hoverText: string;
  to: string;
  variant?: "light" | "dark"; // Новое свойство
}

const Button = ({
  initialText,
  hoverText,
  to,
  variant = "light",
}: ButtonProps) => {
  const isDark = variant === "dark";

  return (
    <Link to={to}>
      <button
        className={`cursor-pointer px-6 py-3 rounded-xl font-normal group transition-all duration-300 
        ${
          isDark ? "bg-[#181818] text-[#EFE393]" : "bg-[#EFE393] text-[#181818]"
        }`}>
        <div className="relative overflow-hidden">
          {/* Основной текст */}
          <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
            {initialText}
          </p>

          {/* Текст при наведении */}
          <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
            {hoverText}
          </p>
        </div>
      </button>
    </Link>
  );
};

export default Button;
