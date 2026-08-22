import type { Product } from "../../../types/productType";
import Rating from "../../../components/ui/Rating";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../../utils/formatCurrency";

interface ProductCardProps {
  product: Product;
}
const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product.slug}`} className=" ">
      <img src={product.images[0]} alt={product.name} />
      <h3>{product.name}</h3>
      <span>{formatCurrency(product.price)}</span>
      <Rating rating={product.rating} reviewCount={product.reviewCount} />
    </Link>
  );
};

export default ProductCard;
