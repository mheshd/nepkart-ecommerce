import type { Product } from "../../../types/productType";

interface SearchSuggestionsProps {
  product: Product[];
  onSelect: (product: Product) => void;
  loading: boolean;
}

const SearchSuggestions = ({
  product,
  onSelect,
  loading,
}: SearchSuggestionsProps) => {
  if (product.length === 0 && !loading) return null;

  return (
    <ul
      className=" absolute top-full left-0 w-full  bg-gray-50 border-t border-gray-100
     shadow-md z-10 p-2"
    >
      {loading && <li className="px-3 py-2">Loading...</li>}
      {product.map((product) => (
        <li key={product.slug}>
          <button
            type="button"
            onClick={() => onSelect(product)}
            className="block w-full text-left px-3 py-2 hover:bg-gray-50 cursor-pointer"
          >
            {product.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SearchSuggestions;
