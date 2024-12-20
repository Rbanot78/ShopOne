import React, { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaTrash, FaHeart, FaTimes } from "react-icons/fa";
import { useFilter } from "@/context/FilterContext";
import Link from "next/link";

const Navbar = () => {
  const { cartItems, wishlistItems, removeCartItem, removeFromWishlist } = useFilter();
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const [isWishlistDropdownOpen, setIsWishlistDropdownOpen] = useState(false);

  const cartRef = useRef(null);
  const wishlistRef = useRef(null);

  // Close both dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target) &&
        wishlistRef.current &&
        !wishlistRef.current.contains(event.target)
      ) {
        setIsCartDropdownOpen(false);
        setIsWishlistDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  const toggleCartDropdown = () => {
    setIsCartDropdownOpen((prev) => !prev);
    setIsWishlistDropdownOpen(false); // Close wishlist dropdown if open
  };

  const toggleWishlistDropdown = () => {
    setIsWishlistDropdownOpen((prev) => !prev);
    setIsCartDropdownOpen(false); // Close cart dropdown if open
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg transition-all duration-300">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Left - Logo */}
        <div className="text-4xl font-bold text-white">
          <Link href="/">ZUDIO</Link>
        </div>

        {/* Right - Cart and Wishlist Icons */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          <div className="relative" ref={cartRef}>
            <button onClick={toggleCartDropdown} className="relative text-white">
              <FaShoppingCart className="text-2xl" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                  {cartCount}
                </span>
              )}
            </button>

            {isCartDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg border p-4 z-10">
                {/* Close Button for Cart */}
                <button
                  onClick={() => setIsCartDropdownOpen(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  <FaTimes className="h-5 w-5" />
                </button>

                <h3 className="text-lg font-semibold mb-4">Your Cart</h3>
                {cartItems.length === 0 ? (
                  <p className="text-center text-sm text-gray-500">Your cart is empty.</p>
                ) : (
                  <ul className="space-y-4">
                    {cartItems.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between items-center pb-4 border-b border-gray-300"
                      >
                        <div className="flex items-center space-x-2">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-10 w-10 object-cover rounded-lg border"
                          />
                          <div className="max-w-[150px]">
                            <p className="font-semibold text-gray-800 truncate">{item.title}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeCartItem(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash className="text-lg" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-4">
                  <Link href="/cart">
                    <button className="w-full text-center py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                      View Cart
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Wishlist Icon */}
          <div className="relative" ref={wishlistRef}>
            <button onClick={toggleWishlistDropdown} className="relative text-white">
              <FaHeart className="text-2xl" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                  {wishlistCount}
                </span>
              )}
            </button>

            {isWishlistDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg border p-4 z-10">
                {/* Close Button for Wishlist */}
                <button
                  onClick={() => setIsWishlistDropdownOpen(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  <FaTimes className="h-5 w-5" />
                </button>

                <h3 className="text-lg font-semibold mb-4">Your Wishlist</h3>
                {wishlistItems.length === 0 ? (
                  <p className="text-center text-sm text-gray-500">Your wishlist is empty.</p>
                ) : (
                  <ul className="space-y-4">
                    {wishlistItems.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between items-center pb-4 border-b border-gray-300"
                      >
                        <div className="flex items-center space-x-2">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-10 w-10 object-cover rounded-lg border"
                          />
                          <div className="max-w-[150px]">
                            <p className="font-semibold text-gray-800 truncate">{item.title}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash className="text-lg" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-4">
                  <Link href="/wishlist">
                    <button className="w-full text-center py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                      View Wishlist
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
