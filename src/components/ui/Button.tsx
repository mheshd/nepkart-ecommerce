import type { ButtonHTMLAttributes } from "react";

interface Btnprops extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent";
}

const variants = {
  primary: " bg-black text-white",
  secondary: "bg-white text-black",
  accent: "bg-[#F85606] text-white hover:bg-[#e04d04]",
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
      className={` rounded-md text-sm  cursor-pointer 
        ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
