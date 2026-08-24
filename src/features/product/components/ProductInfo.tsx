import Rating from "../../../components/ui/Rating";
import type { Product } from "../../../types/productType";
import { formatCurrency } from "../../../utils/formatCurrency";
interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div>
        {product.brand && (
          <p className="font-body text-sm text-gray-500 uppercase tracking-wide mb-1">
            {product.brand}
          </p>
        )}
        <h1 className="font-heading text-xl md:text-2xl  text-gray-900">
          {product.name}
        </h1>
      </div>

      <Rating rating={product.rating} reviewCount={product.reviewCount} />

      <span className="font-body text-2xl  text-[#F85606]">
        {formatCurrency(product.price)}
      </span>

      <div className="border-t border-gray-100 pt-3">
        <p className="font-body text-sm text-gray-700 leading-relaxed">
          {product.description}
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;
