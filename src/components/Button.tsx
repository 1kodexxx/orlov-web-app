import type { ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
}

const baseStyles =
  "inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2";

const variants = {
  solid: "bg-primary text-background hover:brightness-110",
  outline:
    "border border-primary text-primary hover:bg-primary hover:text-background",
  ghost: "text-primary hover:bg-surface",
};

const sizes = {
  sm: "px-4 py-1 text-sm",
  md: "px-6 py-2 text-base",
  lg: "px-8 py-3 text-lg",
};

const Button = ({
  children,
  variant = "solid",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
