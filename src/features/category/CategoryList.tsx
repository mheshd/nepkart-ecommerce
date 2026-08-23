import { Link } from "react-router-dom";
import { getCategories } from "../../services/productService";

interface CategoryListProps {
  onSelect?: () => void;
}

const CategoryList = ({ onSelect }: CategoryListProps) => {
  return (
    <div className=" flex sm:flex-row flex-col items-center gap-2 sm:gap-8 sm:py-1 py-2  px-4 ">
      {getCategories().map((category) => (
        <Link
          key={category}
          to={`/category/${category}`}
          onClick={onSelect}
          className="flex sm:flex-col   items-center text-md  sm:text-sm text-gray-600
           hover:text-black transition-colors group "
        >
          {category}
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
