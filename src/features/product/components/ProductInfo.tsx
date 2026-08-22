// Name, price, description, size/color selectors on the detail page.

import Rating from "../../../components/ui/Rating";
import type { Product } from "../../../types/productType";
interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div>
      <h1>{product.name}</h1>
      <div className=" flex gap-0.5">
        <Rating rating={product.rating} />
        <span>rating {product.reviewCount}</span>
      </div>
      <span>Rs {product.price}</span>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductInfo;
