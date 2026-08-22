import { Link } from "react-router-dom";
import { getCategories } from "../../services/productService";

const CategoryList = () => {
  return (
    <div className=" flex gap-2">
      {getCategories().map((category) => (
        <Link
          key={category}
          to={`/category/${category}`}
          className=" flex  gap-2"
        >
          {category}
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
