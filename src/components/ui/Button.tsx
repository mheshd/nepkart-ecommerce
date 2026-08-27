import type { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Btnprops extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "pill";
}

const variants = {
  primary: " bg-gray-900  text-white",
  secondary: "bg-white text-black",
  ghost:
    " w-9 h-9 flex items-center justify-center text-lg  text-gray-600 hover:bg-gray-50 active:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent ",
  pill: "text-lg font-body bg-gray-100  rounded-full px-2 ",
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
        "rounded-md text-sm  px-2 cursor-pointer  transition-colors",
        variants[variant],
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
