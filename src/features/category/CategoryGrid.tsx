import { Link } from "react-router-dom";
import type { CategoryDisplay } from "../../data/category";

interface CategoryGridProps {
  categories: CategoryDisplay[];
}

const CategoryGrid = ({ categories }: CategoryGridProps) => {
  return (
    <div className="bg-white p-2">
      <h2 className=" font-heading  text-xl text-gray-600 mb-2 ">Categories</h2>
      <div className=" grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6  md:gap-0 gap-1 ">
        {categories.map((category) => (
          <Link
            to={`/category/${category.slug}`}
            key={category.slug}
            className=" flex flex-col items-center  gap-2 text-center  p-4 border
             border-gray-100 transition-shadow duration-200 hover:shadow-2xl "
          >
            <img
              src={category.image}
              alt=""
              className=" w-full aspect-square object-cover  "
            />
            <span className=" font-body ">{category.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
