import { fetchProductById } from "@/api/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetailsLayout from "@/components/ProductDetailsLayout";
import { useFilter } from "@/context/FilterContext";
import ProductSlider from "@/components/ProductSlider";

const ProductDetails = ({ product }) => {
  const {
    addToCart,
    removeCartItem,
    cartItems,
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
  } = useFilter();

  const isProductInCart = cartItems.some((item) => item.id === product.id);
  const isProductInWishlist = wishlistItems.some((item) => item.id === product.id);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* Product Content */}
      <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-10 max-w-6xl mx-auto mt-10 transition-all duration-300 ease-in-out">
        <ProductDetailsLayout
          product={product}
          isProductInCart={isProductInCart}
          isProductInWishlist={isProductInWishlist}
          addToCart={addToCart}
          removeCartItem={removeCartItem}
          addToWishlist={addToWishlist}
          removeFromWishlist={removeFromWishlist}
        />
      </div>

      {/* Product Slider */}
      <div className="mt-10">
        <ProductSlider />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  try {
    const product = await fetchProductById(id);

    if (!product) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error("Error fetching product by id in getServerSideProps:", error);

    return {
      notFound: true,
    };
  }
};

export default ProductDetails;
