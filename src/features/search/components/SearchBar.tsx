// The input field in the navbar; owns the typed query as local state.

import { useState } from "react";
import Input from "../../../components/ui/Input";
import { UseSearch } from "../hooks/useSearch";
import SearchSuggestions from "./SearchSuggestions";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../../types/productType";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { result, loading } = UseSearch(query);
  const navigate = useNavigate();

  const handleSelect = (product: Product) => {
    setQuery("");
    navigate(`/category/${product.category}`);
  };

  return (
    <div className="relative">
      <Input
        placeholder="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <SearchSuggestions
        product={result}
        onSelect={handleSelect}
        loading={loading}
      />
    </div>
  );
};

export default SearchBar;
