import { Link } from "react-router-dom";

interface CategoryListProps {
  categories: string[];
}

const CategoryList = ({ categories }: CategoryListProps) => {
  return (
    <div>
      {categories.map((category) => (
        <Link key={category} to={`/category/${category}`}>
          {category}
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
