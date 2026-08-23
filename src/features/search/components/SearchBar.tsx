import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Input from "../../../components/ui/Input";
import { useSearch } from "../hooks/useSearch";
import SearchSuggestions from "./SearchSuggestions";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../../types/productType";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { results, loading } = useSearch(query);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (product: Product) => {
    setQuery("");
    navigate(`/category/${product.category}`);
  };

  function handleSearchSubmit() {
    if (!query.trim()) return;

    if (results[0]) {
      navigate(`/category/${results[0].category}`);
      setQuery("");
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSearchSubmit();
  }

  return (
    <div ref={wrapperRef} className="relative flex-1">
      <Input
        placeholder="search in Nepcart"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className=" border-none"
      />
      <button
        onClick={handleSearchSubmit}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400  cursor-pointer"
      >
        <Search size={20} />
      </button>
      <SearchSuggestions
        product={results}
        onSelect={handleSelect}
        loading={loading}
      />
    </div>
  );
};

export default SearchBar;
