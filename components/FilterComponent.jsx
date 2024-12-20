import { useState } from "react";
import { useFilter } from "@/context/FilterContext"; // Import your context if needed
import { FaTimes } from "react-icons/fa"; // Close icon

const FilterDropdown = () => {
  const { selectedCategory, setSelectedCategory, priceRange, setPriceRange, categories } = useFilter(); // Access categories from context
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      {/* Button to toggle the dropdown */}
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg shadow-md hover:from-indigo-700 hover:to-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
      >
        Filter Options
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg border p-4 z-10">
          {/* Close Button */}
          <button
            onClick={closeDropdown}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="h-5 w-5" />
          </button>

          <h3 className="text-lg font-semibold mb-4">Filters</h3>

          {/* Category Filter */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-800 mb-2">Category</h4>
            <div className="space-y-2">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`text-sm font-medium py-2 px-4 rounded-md border-2 transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-blue-500 text-white border-blue-600"
                        : "bg-gray-200 text-gray-700 border-transparent hover:bg-blue-100 hover:border-blue-300"
                    }`}
                  >
                    {category}
                  </button>
                ))
              ) : (
                <p className="text-sm text-gray-500">No categories available</p>
              )}
              <button
                onClick={() => setSelectedCategory("")}
                className={`text-sm font-medium py-2 px-4 rounded-md border-2 transition-all duration-300 ${
                  !selectedCategory
                    ? "bg-blue-500 text-white border-blue-600"
                    : "bg-gray-200 text-gray-700 border-transparent hover:bg-blue-100 hover:border-blue-300"
                }`}
              >
                All Categories
              </button>
            </div>
          </div>

          {/* Price Filter */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-800 mb-2">Price Range</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <label htmlFor="price" className="text-sm font-medium text-gray-700">
                  Price:
                </label>
                <span className="text-sm font-semibold text-blue-600">
                  ${priceRange[0]} - ${priceRange[1]}
                </span>
              </div>
              <input
                type="range"
                id="price"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="w-full h-2 bg-blue-500 rounded-full focus:outline-none"
              />
            </div>
          </div>

          {/* Apply Filter Button */}
          <div className="flex justify-end mt-4">
            <button
              onClick={closeDropdown}
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
