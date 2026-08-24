import type { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Btnprops extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const variants = {
  primary: " bg-black text-white",
  secondary: "bg-white text-black",
};

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: Btnprops) => {
  return (
    <button
      {...props}
      className={twMerge(
        "rounded-md text-sm cursor-pointer",
        variants[variant],
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
