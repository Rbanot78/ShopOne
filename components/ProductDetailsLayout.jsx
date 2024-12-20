import { FaShoppingCart, FaTrash, FaHeart, FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import toast from "react-hot-toast";

const ProductDetailsLayout = ({
  product,
  isProductInCart,
  isProductInWishlist,
  addToCart,
  removeCartItem,
  addToWishlist,
  removeFromWishlist,
}) => {
  const handleAddToCart = () => {
    if (!isProductInCart) {
      addToCart(product);
      toast.success("Added to cart!");
    } else {
      toast.error("This product is already in the cart!");
    }
  };

  const handleRemoveFromCart = () => {
    removeCartItem(product.id);
    toast.success("Removed from cart!");
  };

  const handleAddToWishlist = () => {
    if (!isProductInWishlist) {
      addToWishlist(product);
      toast.success("Added to wishlist!");
    } else {
      toast.error("This product is already in the wishlist!");
    }
  };

  const handleRemoveFromWishlist = () => {
    removeFromWishlist(product.id);
    toast.success("Removed from wishlist!");
  };

  return (
    <div className="flex flex-col md:flex-row gap-10">
      {/* Product Image */}
      <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
        <motion.div
          className="relative w-full h-64 sm:h-80 md:h-96 lg:h-112 xl:h-128 rounded-xl overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={product.image}
            alt={product.title}
            className="object-contain w-full h-full shadow-xl rounded-lg"
          />
        </motion.div>
      </div>

      {/* Product Info and Actions */}
      <div className="w-full md:w-1/2">
        {/* Product Info */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">{product.title}</h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-6">{product.description}</p>
        <div className="flex items-center mb-4 space-x-4">
          <p className="text-xl sm:text-2xl font-bold text-gray-800">Price:</p>
          <p className="text-xl sm:text-2xl text-blue-600 font-semibold">${product.price}</p>
        </div>
        <p className="text-md sm:text-lg text-gray-600 font-medium mb-6">Category: {product.category}</p>

        {/* Add to Cart and Wishlist Buttons */}
        <div className="flex space-x-4">
          {/* Add/Remove Cart Button */}
          {isProductInCart ? (
            <motion.button
              onClick={handleRemoveFromCart}
              className="flex-1 flex items-center justify-center py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition-all ease-in-out transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <FaTrash className="mr-2" />
              Remove from Cart
            </motion.button>
          ) : (
            <motion.button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-all ease-in-out transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <FaShoppingCart className="mr-2" />
              Add to Cart
            </motion.button>
          )}

          {/* Add/Remove Wishlist Button */}
          {isProductInWishlist ? (
            <motion.button
              onClick={handleRemoveFromWishlist}
              className="flex-1 flex items-center justify-center py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition-all ease-in-out transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <FaHeart className="mr-2" />
              Remove from Wishlist
            </motion.button>
          ) : (
            <motion.button
              onClick={handleAddToWishlist}
              className="flex-1 flex items-center justify-center py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition-all ease-in-out transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <FaRegHeart className="mr-2" />
              Add to Wishlist
            </motion.button>
          )}
        </div>
      </div>

      {/* Dialog for Confirming Actions (Optional, if needed) */}
      <Dialog open={false} onClose={() => {}}>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <Dialog.Content className="fixed inset-1/4 bg-white rounded-lg p-8 shadow-xl max-w-sm w-full">
          <Dialog.Title>Confirm Action</Dialog.Title>
          <Dialog.Description>
            Are you sure you want to remove this item from your wishlist?
          </Dialog.Description>
          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => {}}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Confirm
            </button>
            <button
              onClick={() => {}}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg"
            >
              Cancel
            </button>
          </div>
        </Dialog.Content>
      </Dialog>
    </div>
  );
};

export default ProductDetailsLayout;
