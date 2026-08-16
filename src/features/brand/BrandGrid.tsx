import { Link } from "react-router-dom";
import type { BrandDisplay } from "../../data/brand";

interface BrandGridProps {
  brands: BrandDisplay[];
}
const BrandGrid = ({ brands }: BrandGridProps) => {
  return (
    <div>
      <h2>brands</h2>
      <div className=" grid grid-cols-4 gap-2">
        {brands.map((brand) => (
          <Link to={`/brands/${brand.slug}`} key={brand.slug}>
            <img src={brand.logo} alt={brand.label} />
            <span>{brand.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrandGrid;
