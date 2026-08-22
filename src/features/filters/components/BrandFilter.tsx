// 	Brand checkboxes.

import Checkbox from "../../../components/ui/Checkbox";

interface brandListProps {
  brandlist: string[];
  selectedBrands: string[];
  onToggle: (brand: string) => void;
}
const BrandFilter = ({
  brandlist,
  selectedBrands,
  onToggle,
}: brandListProps) => {
  return (
    <div>
      <h1>brands</h1>
      <ul>
        {brandlist.map((brand) => (
          <li key={brand} className=" flex gap-2 items-center">
            <Checkbox
              checked={selectedBrands.includes(brand)}
              onChange={() => onToggle(brand)}
              label={brand}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandFilter;
