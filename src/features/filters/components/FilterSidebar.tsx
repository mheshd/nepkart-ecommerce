import BrandFilter from "./BrandFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import RatingFilter from "./RatingFilter";
import SizeFilter from "./SizeFilter";
interface FilterSidebarProps {
  brands: string[];
  selectedBrands: string[];
  onToggleBrand: (brand: string) => void;
  sizes: string[];
  selectedSizes: string[];
  onToggleSize: (size: string) => void;
  priceRange: [number, number];
  onApply: (max: number, min: number) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
}
const FilterSidebar = ({
  brands,
  selectedBrands,
  onToggleBrand,
  sizes,
  selectedSizes,
  onToggleSize,
  priceRange,
  onApply,
  minRating,
  setMinRating,
}: FilterSidebarProps) => {
  return (
    <div className="flex flex-col gap-2">
      <BrandFilter
        brandlist={brands}
        selectedBrands={selectedBrands}
        onToggle={onToggleBrand}
      />
      <SizeFilter
        sizes={sizes}
        selectedSizes={selectedSizes}
        onToggle={onToggleSize}
      />
      <PriceRangeFilter priceRange={priceRange} onApply={onApply} />
      <RatingFilter minRating={minRating} onChange={setMinRating} />
    </div>
  );
};

export default FilterSidebar;
