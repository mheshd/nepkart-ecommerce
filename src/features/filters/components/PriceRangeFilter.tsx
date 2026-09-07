import { ChevronRight } from "lucide-react";
import { useState } from "react";
interface PriceRangeFilterProps {
  priceRange: [number, number];
  onApply: (min: number, max: number) => void;
}

const PriceRangeFilter = ({ priceRange, onApply }: PriceRangeFilterProps) => {
  const [minInput, setMinInput] = useState(
    priceRange[0] === 0 ? "" : String(priceRange[0]),
  );
  const [maxInput, setMaxInput] = useState(
    priceRange[1] === Infinity ? "" : String(priceRange[1]),
  );
  const [error, setError] = useState<string | null>(null);

  function handleApply() {
    const min = minInput.trim() === "" ? 0 : Number(minInput);
    const max = maxInput.trim() === "" ? Infinity : Number(maxInput);

    if (isNaN(min) || isNaN(max)) {
      setError("please enter a valid numbers");
      return;
    }
    if (min < 0 || max < 0) {
      setError('Price can"t be negative');
      return;
    }
    if (min > max) {
      setError('minimum can"t greater than maximam');
      return;
    }
    setError(null);
    onApply(min, max);
  }
  return (
    <div className="mt-1">
      <h2 className="font-heading text-sm font-semibold text-gray-800 uppercase tracking-wide mb-1 ">
        Price
      </h2>
      <div className="flex items-center gap-1">
        <input
          type="number"
          placeholder="min"
          value={minInput}
          onChange={(e) => setMinInput(e.target.value)}
          className="w-16 border border-gray-400  rounded-sm px-3 py-1 text-sm  outline-none  "
          aria-label="Minimum price"
        />
        <span className="text-gray-400 text-sm">–</span>
        <input
          type="number"
          placeholder="max"
          value={maxInput}
          onChange={(e) => setMaxInput(e.target.value)}
          className="w-16 border border-gray-400  rounded-sm px-2 py-1 text-sm outline-none"
          aria-label="Maximum price"
        />
        <button
          type="button"
          onClick={handleApply}
          aria-label="Apply price filter"
          className="w-8 h-8  flex items-center justify-center rounded-sm bg-[#F85606] text-white 
          hover:bg-[#4096FF]   shrink-0"
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>
      {error && (
        <p role="alert" className="text-xs text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default PriceRangeFilter;
