import type { InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = ({ label, id, className = "", ...props }: CheckboxProps) => {
  return (
    <label
      htmlFor={id}
      className={`flex items-center gap-2 cursor-pointer ${className}`}
    >
      <input type="checkbox" id={id} {...props} />
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
};

export default Checkbox;
