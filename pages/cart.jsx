// pages/cart.js
import { useFilter } from '@/context/FilterContext';
import { useState } from 'react';
import Link from 'next/link';  // Import Link for navigation
import CartDetails from '@/components/CartDetails';  // Import the CartDetails component

const Cart = () => {
  const { cartItems, total } = useFilter();
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="cart container mx-auto p-6">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Your Cart</h2>
      
      {/* Home Button */}
      <div className="mb-6">
        <Link href="/" className="inline-block text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">
          &larr; Back to Home
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center text-lg text-gray-600">Your cart is empty. Please add some products to your cart!</div>
      ) : (
        <>
          <ul className="space-y-6">
            {cartItems.map((cartItem) => (
              <CartDetails key={cartItem.id} cartItem={cartItem} />
            ))}
          </ul>

          {/* Cart Total */}
          <div className="mt-6 bg-gray-100 p-5 rounded-lg flex justify-between items-center shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">Total Price:</h3>
            <p className="text-xl font-bold text-blue-600">${total}</p>
          </div>

          {/* Checkout Button */}
          <div className="mt-6">
            <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
