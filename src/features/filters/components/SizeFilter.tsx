import Checkbox from "../../../components/ui/Checkbox";

interface SizeFilterProps {
  sizes: string[];
  selectedSizes: string[];
  onToggle: (size: string) => void;
}

const SizeFilter = ({ sizes, selectedSizes, onToggle }: SizeFilterProps) => {
  return (
    <div className="mt-2">
      <h2 className="font-heading text-sm font-semibold text-gray-800 uppercase tracking-wide mb-1 ">
        Sizes
      </h2>
      <ul className=" flex flex-col gap-1">
        {sizes.map((size) => {
          const selected = selectedSizes.includes(size);
          return (
            <li key={size}>
              <Checkbox
                checked={selected}
                onChange={() => onToggle(size)}
                label={size}
                className={
                  selected ? "text-gray-900 font-medium" : "text-gray-600"
                }
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SizeFilter;
