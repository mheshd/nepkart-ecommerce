// 	Reads category/brand/search from the URL,
// fetches the matching product list,   runs it through useProductFilters,   renders =  FilterSidebar + ProductGrid.

import { useParams } from "react-router-dom";
import {
  getBrandList,
  getProductsByBrand,
  getProductsByCategory,
  getSizeList,
} from "../services/productService";
import ProductGrid from "../features/product/components/ProductGrid";
import FilterSidebar from "../features/filters/components/FilterSidebar";
import { useProductFilter } from "../features/filters/hooks/useProductFilters";
import SortDropdown from "../features/filters/components/SortDropdown";

const ProductListingPage = () => {
  const { categorySlug, brandSlug } = useParams<{
    categorySlug: string;
    brandSlug: string;
  }>();

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

  return (
    <div className="p-4">
      <h1>{heading}</h1>

      <div className=" flex items-start gap-5 ">
        <FilterSidebar
          brands={getBrandList(products)}
          selectedBrands={selectedBrands}
          onToggleBrand={toggleBrand}
          onToggleSize={toggleSize}
          selectedSizes={selectedSizes}
          sizes={getSizeList(products)}
          priceRange={priceRange}
          onApply={setPriceFilter}
          minRating={minRating}
          setMinRating={setMinRating}
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              {filteredProducts.length} products
            </p>
            <SortDropdown sortOrder={sortOrder} onChange={setSortOrder} />
          </div>
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
