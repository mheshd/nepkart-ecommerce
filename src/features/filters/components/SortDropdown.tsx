interface SortDropdownProps {
  sortOrder: "price-asc" | "price-desc" | null;
  onChange: (order: "price-asc" | "price-desc" | null) => void;
}

const SortDropdown = ({ sortOrder, onChange }: SortDropdownProps) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm text-gray-500">
        Sort by
      </label>
      <select
        id="sort"
        value={sortOrder ?? ""}
        onChange={(e) =>
          onChange(
            e.target.value === ""
              ? null
              : (e.target.value as "price-asc" | "price-desc"),
          )
        }
        className="border rounded-md px-2 py-1 text-sm"
      >
        <option value="">Relevance</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default SortDropdown;
