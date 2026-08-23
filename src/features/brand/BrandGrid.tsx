import { Link } from "react-router-dom";
import type { BrandDisplay } from "../../data/brand";

interface BrandGridProps {
  brands: BrandDisplay[];
}
const BrandGrid = ({ brands }: BrandGridProps) => {
  return (
    <div className="bg-white p-2">
      <h2 className=" font-heading  text-xl text-gray-600 mb-2 ">brands</h2>
      <div className=" grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6  md:gap-0 gap-1 ">
        {brands.map((brand) => (
          <Link
            to={`/brands/${brand.slug}`}
            key={brand.slug}
            className=" flex flex-col items-center  gap-2 text-center  p-4 border
             border-gray-100 transition-shadow duration-200 hover:shadow-2xl "
          >
            <img
              src={brand.logo}
              alt={brand.label}
              className=" w-full aspect-square object-cover  "
            />
            <span className=" font-body ">{brand.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrandGrid;
