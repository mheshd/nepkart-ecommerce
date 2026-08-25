import { useParams } from "react-router-dom";
import {
  getBrandList,
  getProductsByBrand,
  getProductsByCategory,
  getSizeList,
} from "../services/productService";
import { SlidersHorizontal, X } from "lucide-react";
import ProductGrid from "../features/product/components/ProductGrid";
import FilterSidebar from "../features/filters/components/FilterSidebar";
import { useProductFilter } from "../features/filters/hooks/useProductFilters";
import SortDropdown from "../features/filters/components/SortDropdown";
import { useState } from "react";

const ProductListingPage = () => {
  const { categorySlug, brandSlug } = useParams<{
    categorySlug: string;
    brandSlug: string;
  }>();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const products = categorySlug
    ? getProductsByCategory(categorySlug)
    : brandSlug
      ? getProductsByBrand(brandSlug)
      : [];

  const heading = categorySlug ?? brandSlug ?? "Products";

  const {
    selectedBrands,
    toggleBrand,
    filteredProducts,
    toggleSize,
    selectedSizes,
    priceRange,
    setPriceFilter,
    minRating,
    setMinRating,
    sortOrder,
    setSortOrder,
  } = useProductFilter(products);

  const filterProps = {
    brands: getBrandList(products),
    selectedBrands,
    onToggleBrand: toggleBrand,
    onToggleSize: toggleSize,
    selectedSizes,
    sizes: getSizeList(products),
    priceRange,
    onApply: setPriceFilter,
    minRating,
    setMinRating,
  };

  return (
    <div className=" max-w-6xl mx-auto px-4  py-5">
      <div className="  flex flex-col  gap-1 mb-2">
        <h2 className=" font-body text-sm">Category</h2>
        <h2 className=" text-sm text-yellow-900">{heading}</h2>
      </div>

      <div className=" flex  items-start gap-5 ">
        <div className=" hidden md:block w-44 shrink-0">
          <FilterSidebar {...filterProps} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex  items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowMobileFilters(true)}
                className="md:hidden flex items-center gap-1.5 border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700"
              >
                <SlidersHorizontal size={14} />
                Filters
              </button>
              <p className="text-sm text-gray-500">
                {filteredProducts.length} products
              </p>
            </div>

            <SortDropdown sortOrder={sortOrder} onChange={setSortOrder} />
          </div>
          <ProductGrid products={filteredProducts} />
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showMobileFilters && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setShowMobileFilters(false)}
            aria-hidden="true"
          />
          <div className="relative ml-auto w-4/5 max-w-xs bg-white h-full overflow-y-auto p-4 ">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-semibold">Filters</h2>
              <button
                type="button"
                onClick={() => setShowMobileFilters(false)}
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>

            <FilterSidebar {...filterProps} />

            <button
              type="button"
              onClick={() => setShowMobileFilters(false)}
              className="w-full mt-6 bg-[#F85606] text-white py-2.5 rounded-md text-sm font-medium"
            >
              Show {filteredProducts.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListingPage;
