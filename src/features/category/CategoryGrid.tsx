import { Link } from "react-router-dom";
import type { CategoryDisplay } from "../../data/category";

interface CategoryGridProps {
  categories: CategoryDisplay[];
}

const CategoryGrid = ({ categories }: CategoryGridProps) => {
  return (
    <div>
      <h2>Categories</h2>
      <div className=" grid grid-cols-4 gap-2">
        {categories.map((category) => (
          <Link to={`/category/${category.slug}`} key={category.slug}>
            <img src={category.image} alt={category.label} />
            <span>{category.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
