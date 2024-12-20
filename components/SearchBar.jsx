import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const SearchBar = ({ products, setFilteredProducts }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const searchBarRef = useRef(null);
  const debounceTimeout = useRef(null);

  // Handle input change and debounce the filtering process
  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (value.length > 2) {
      debounceTimeout.current = setTimeout(() => {
        const suggestions = products.filter((product) =>
          product.title.toLowerCase().includes(value.toLowerCase())
        );
        setSearchSuggestions(suggestions);
        setIsSuggestionsVisible(true);
      }, 300); // 300ms debounce delay
    } else {
      setIsSuggestionsVisible(false);
    }
  };

  const handleSuggestionClick = (product) => {
    setSearchTerm(product.title);
    setFilteredProducts([product]); // Filter results to show only the selected product
    setIsSuggestionsVisible(false);
  };

  // Close suggestions when clicking outside the search bar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setIsSuggestionsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Clear search on Escape key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSearchTerm("");
        setIsSuggestionsVisible(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={searchBarRef} className="relative w-full max-w-lg">
      {/* Input Field */}
      <div className="relative flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchInputChange}
          className="w-full p-3 pl-10 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gradient-to-r from-gray-50 to-gray-100"
          placeholder="Search for products..."
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width={20}
          height={20}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
      </div>

      {/* Dropdown Suggestions */}
      {isSuggestionsVisible && (
        <ul className="absolute left-0 top-full mt-2 w-full bg-white border border-gray-200 shadow-lg rounded-xl max-h-60 overflow-y-auto z-50">
          {searchSuggestions.length > 0 ? (
            searchSuggestions.map((product) => (
              <li
                key={product.id}
                className="flex items-center gap-3 p-3 cursor-pointer hover:bg-blue-100 transition-all duration-200"
                onClick={() => handleSuggestionClick(product)}
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  width={40}
                  height={40}
                  className="rounded-md"
                />
                <span className="text-sm font-medium text-gray-700">
                  {product.title}
                </span>
              </li>
            ))
          ) : (
            <li className="p-3 text-gray-500 text-center">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
