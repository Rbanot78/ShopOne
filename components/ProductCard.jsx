import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHeart, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const ProductCard = ({
  product,
  handleAddToCart,
  handleAddToWishlist,
  isProductInWishlist,
}) => {
  // Calculate the discounted price (if any)
  const discount = product.discount || 0; // Assuming a `discount` field exists (percentage)
  const discountedPrice = discount
    ? (product.price * (1 - discount / 100)).toFixed(2)
    : product.price;

  return (
    <motion.li
      className="product-card flex flex-col justify-between h-full rounded-lg shadow-md p-4 hover:shadow-lg transform transition-transform duration-300 backdrop-blur-md bg-opacity-60"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Section */}
      <div className="relative w-full h-48 mb-4 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
        <Image
          className="object-contain"
          src={product.image}
          alt={product.title}
          width={150}
          height={150}
        />
      </div>

      {/* Content Section */}
      <div className="flex-grow">
        <h2 className="text-sm font-semibold text-gray-700 truncate">{product.title}</h2>
        
        {/* Price Section */}
        <div className="mt-2">
          {discount > 0 && (
            <p className="text-sm font-semibold text-gray-500 line-through">
              ${product.price}
            </p>
          )}
          <p className="text-md font-semibold text-yellow-500">
            ${discount > 0 ? discountedPrice : product.price}
          </p>
          {discount > 0 && (
            <span className="text-sm text-red-600 font-medium">-{discount}%</span>
          )}
        </div>
      </div>

      {/* Actions Section */}
      <div className="flex justify-between items-center mt-4">
        <Link
          href={`/product/${product.id}`}
          className="text-blue-600 hover:text-blue-800 transition font-medium flex items-center"
        >
          View Details
          <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
        </Link>
        <div className="flex gap-2">
          <motion.button
            onClick={() => handleAddToCart(product)}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faShoppingCart} />
          </motion.button>
          <motion.button
            onClick={() => handleAddToWishlist(product)}
            className={`p-2 rounded-full ${
              isProductInWishlist(product.id) ? "bg-red-800" : "bg-red-600"
            } text-white hover:bg-red-700 transition-all duration-300`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faHeart} />
          </motion.button>
        </div>
      </div>
    </motion.li>
  );
};

export default ProductCard;
