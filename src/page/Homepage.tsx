import BrandGrid from "../features/brand/BrandGrid";
import CategoryGrid from "../features/category/CategoryGrid";
import ProductGrid from "../features/product/components/ProductGrid";
import { useProducts } from "../features/product/hooks/useProducts";
import {
  getBrandDisplay,
  getCategoryDisplays,
} from "../services/productService";

const Homepage = () => {
  const { loading, products } = useProducts();

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto py-8 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className=" w-full max-w-7xl mx-auto py-8 space-y-10">
      <CategoryGrid categories={getCategoryDisplays()} />
      <BrandGrid brands={getBrandDisplay()} />
      <ProductGrid products={products} />
    </div>
  );
};

export default Homepage;
