import Checkbox from "../../../components/ui/Checkbox";

interface SizeFilterProps {
  sizes: string[];
  selectedSizes: string[];
  onToggle: (size: string) => void;
}

const SizeFilter = ({ sizes, selectedSizes, onToggle }: SizeFilterProps) => {
  return (
    <div>
      <h2>Size</h2>
      <ul>
        {sizes.map((size) => (
          <li key={size}>
            <Checkbox
              checked={selectedSizes.includes(size)}
              onChange={() => onToggle(size)}
              label={size}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SizeFilter;
