import { useFilter } from '@/context/FilterContext';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const CartDetails = ({ cartItem }) => {
  const { updateCartItem, removeCartItem } = useFilter();

  return (
    <motion.li
      key={cartItem.id}
      className="flex flex-wrap items-center justify-between bg-white p-5 rounded-lg shadow-lg transition-transform transform hover:scale-105 mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Product Info */}
      <div className="flex items-center space-x-5 w-full sm:w-auto">
        <Link href={`/product/${cartItem.id}`} passHref>
          <div className="flex items-center space-x-5 w-full sm:w-auto cursor-pointer">
            <img
              src={cartItem.image}
              alt={cartItem.title}
              className="h-24 w-24 object-cover rounded-lg border border-gray-200 shadow-md"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">{cartItem.title}</h3>
              <p className="text-gray-600">Price: ${cartItem.price}</p>
              <p className="text-gray-600">Total: ${(cartItem.price * cartItem.quantity).toFixed(2)}</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Quantity Control & Remove */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => updateCartItem(cartItem.id, cartItem.quantity - 1)}
            disabled={cartItem.quantity <= 1}
            className="p-2 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition-all duration-200 ease-in-out disabled:bg-gray-300"
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>

          <span className="text-lg font-medium text-gray-700">{cartItem.quantity}</span>

          <button
            onClick={() => updateCartItem(cartItem.id, cartItem.quantity + 1)}
            className="p-2 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition-all duration-200 ease-in-out"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>

        <button
          onClick={() => removeCartItem(cartItem.id)}
          className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-200 ease-in-out"
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </motion.li>
  );
};

export default CartDetails;
