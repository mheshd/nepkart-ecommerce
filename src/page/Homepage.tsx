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

  return (
    <div className=" w-full max-w-7xl mx-auto py-8">
      <CategoryGrid categories={getCategoryDisplays()} />
      <BrandGrid brands={getBrandDisplay()} />
      <ProductGrid products={products} />
    </div>
  );
};

export default Homepage;
