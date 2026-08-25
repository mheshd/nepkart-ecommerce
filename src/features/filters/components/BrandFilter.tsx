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
    <div className="mt-2">
      <h2 className="font-heading text-sm font-semibold text-gray-800 uppercase tracking-wide mb-1">
        Brands
      </h2>
      <ul className=" flex flex-col gap-1 ">
        {brandlist.map((brand) => {
          const selected = selectedBrands.includes(brand);
          return (
            <li key={brand}>
              <Checkbox
                checked={selected}
                onChange={() => onToggle(brand)}
                label={brand}
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

export default BrandFilter;
