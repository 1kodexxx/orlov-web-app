import { Link } from "react-router-dom";

interface ButtonProps {
  initialText: string;
  hoverText: string;
  to: string;
}

const Button = ({ initialText, hoverText, to }: ButtonProps) => {
  return (
    <Link to={to}>
      <button className="cursor-pointer bg-[#EFE393] px-6 py-3 rounded-xl text-[#181818] font-normal group transition-all duration-300">
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
