import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface SortDropdownProps {
  sortOrder: "price-asc" | "price-desc" | null;
  onChange: (order: "price-asc" | "price-desc" | null) => void;
}

const options = [
  { value: null, label: "Best match" },
  { value: "price-asc" as const, label: "Price: Low to High" },
  { value: "price-desc" as const, label: "Price: High to Low" },
];

const SortDropdown = ({ sortOrder, onChange }: SortDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current = options.find((o) => o.value === sortOrder) ?? options[0];

  return (
    <div ref={ref} className="relative flex items-center gap-2 ">
      <span className="font-body text-sm text-gray-500 whitespace-nowrap">
        Sort by
      </span>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="font-body flex items-center gap-1.5 rounded-md border border-gray-300 px-4 py-2 
          text-[13px] text-gray-700 bg-white hover:border-gray-400 transition-colors"
      >
        {current.label}
        <ChevronDown
          size={14}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-100 rounded-md shadow-lg overflow-hidden z-20"
        >
          {options.map((option) => {
            const selected = option.value === sortOrder;
            return (
              <li key={option.label} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors ${
                    selected
                      ? "text-black font-medium bg-sky-100"
                      : "text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SortDropdown;
