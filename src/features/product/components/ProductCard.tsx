import type { Product } from "../../../types/productType";
import Rating from "../../../components/ui/Rating";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../../utils/formatCurrency";

interface ProductCardProps {
  product: Product;
}
const ProductCard = ({ product }: ProductCardProps) => {
  const badge = product.tags.includes("bestseller")
    ? "Bestseller"
    : product.tags.includes("new")
      ? "New"
      : null;

  return (
    <Link
      to={`/product/${product.slug}`}
      className=" group  flex flex-col gap-1 bg-white  rounded-lg border border-gray-100   
      transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 "
    >
      <div className="relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {badge && (
          <span className="absolute top-2 left-2 bg-black text-white text-xs font-medium px-2 py-1 rounded">
            {badge}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1 p-3">
        <h3 className="font-body text-sm text-gray-800 line-clamp-2 min-h-10">
          {product.name}
        </h3>
        <Rating rating={product.rating} reviewCount={product.reviewCount} />
        <span className="font-body font-semibold text-[#F85606] text-base mt-1">
          {formatCurrency(product.price)}
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
