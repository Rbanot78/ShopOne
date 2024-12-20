import React from "react";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { useFilter } from "@/context/FilterContext";
import Link from "next/link";

const Wishlist = () => {
  const {
    wishlistItems,
    addToCart,
    removeFromWishlist,
  } = useFilter();

  const handleAddToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id); // Remove from wishlist when added to cart
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Your Wishlist</h2>

      {/* Display message if wishlist is empty */}
      {wishlistItems.length === 0 ? (
        <div className="text-center">
          <p className="text-lg text-gray-600">Your wishlist is empty.</p>
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-semibold">
            Go back to Home
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlistItems.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform transition duration-300 ease-in-out hover:scale-105"
            >
              {/* Link to product details */}
              <Link href={`/product/${product.id}`}>
                <div className="relative cursor-pointer">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-cover w-full h-64 rounded-t-xl transition duration-300 ease-in-out transform hover:scale-110"
                  />
                </div>
              </Link>
              <div className="p-4">
                <Link href={`/product/${product.id}`}>
                  <h3 className="text-lg font-semibold text-gray-800 truncate cursor-pointer hover:text-blue-600">
                    {product.title.length > 18
                      ? `${product.title.substring(0, 18)}...`
                      : product.title}
                  </h3>
                </Link>
                <p className="text-lg text-blue-600 mt-2 font-medium">${product.price}</p>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-100 rounded-b-xl">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                >
                  <FaShoppingCart className="mr-2 inline-block" />
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="text-red-600 hover:text-red-800 transition duration-300"
                >
                  <FaTrash className="h-6 w-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Home button */}
      <div className="text-center mt-6">
        <Link
          href="/"
          className="bg-gray-800 text-white py-2 px-6 rounded-md hover:bg-gray-900 transition duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Wishlist;
