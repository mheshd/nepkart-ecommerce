// min max price input

import { SquareChevronRight } from "lucide-react";
import { useState } from "react";
interface PriceRangeFilterProps {
  priceRange: [number, number];
  onApply: (min: number, max: number) => void;
}

const PriceRangeFilter = ({ priceRange, onApply }: PriceRangeFilterProps) => {
  const [minInput, setMinInput] = useState(String(priceRange[0]));
  const [maxInput, setMaxInput] = useState(String(priceRange[1]));
  const [error, setError] = useState<string | null>(null);

  function handleApply() {
    const min = Number(minInput);
    const max = Number(maxInput);

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
    <div>
      <h2 className="font-medium mb-2">Price</h2>
      <div className="flex items-center gap-1">
        <input
          type="number"
          placeholder="min"
          value={minInput}
          onChange={(e) => setMinInput(e.target.value)}
          className="w-16 border rounded px-2 py-1 text-sm"
          aria-label="Minimum price"
        />
        <span>-</span>
        <input
          type="number"
          placeholder="max"
          value={maxInput}
          onChange={(e) => setMaxInput(e.target.value)}
          className="w-16 border rounded px-2 py-1 text-sm"
          aria-label="Minimum price"
        />
        <button
          type="button"
          onClick={handleApply}
          aria-label="Apply price filter"
        >
          <SquareChevronRight size={20} aria-hidden="true" />
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
