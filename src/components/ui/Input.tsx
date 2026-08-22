import type { InputHTMLAttributes } from "react";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  varient?: "primary";
}
const varients = {
  primary: "border border-gray-300 px-4 py-3 ",
};

const Input = ({
  label,
  varient = "primary",
  className = "",
  ...props
}: inputProps) => {
  return (
    <input
      type="text"
      className={`w-full rounded-lg bg-white text-sm text-gray-900 outline-none
         ${varients[varient]} ${className}`}
      {...props}
    />
  );
};

export default Input;
