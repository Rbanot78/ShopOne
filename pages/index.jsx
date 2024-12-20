import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useFilter } from "@/context/FilterContext";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import FilterComponent from "@/components/FilterComponent";
import Pagination from "@/components/Pagination";
import { Toaster, toast } from "react-hot-toast";

const Home = ({ initialProducts }) => {
  const {
    selectedCategory,
    priceRange,
    addToCart,
    removeCartItem,
    addToWishlist,
    removeFromWishlist,
    isProductInWishlist,
    isProductInCart,
    setCurrentPage,
    currentPage,
    cartItems, // Get cartItems from context
  } = useFilter();

  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const itemsPerPage = 12;

  useEffect(() => {
    const updatedFilteredProducts = products.filter((product) => {
      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true;
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesPrice;
    });

    setFilteredProducts(updatedFilteredProducts);
  }, [products, selectedCategory, priceRange]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddToCart = (product) => {
    if (isProductInCart(product.id)) {
      toast.error("This item is already in your cart!");
    } else {
      addToCart(product);
      toast.success("Item added to cart!");
    }
  };

  const handleRemoveFromCart = (productId) => {
    removeCartItem(productId);
    toast.success("Item removed from cart!");
  };

  const handleAddToWishlist = (product) => {
    if (isProductInCart(product.id)) {
      toast.error("This item is already in your cart, cannot be added to wishlist!");
    } else if (isProductInWishlist(product.id)) {
      toast.error("This item is already in your wishlist!");
    } else {
      addToWishlist(product);
      toast.success("Item added to wishlist!");
    }
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
    toast.success("Item removed from wishlist!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-6 py-8 lg:px-16 bg-gradient-to-r from-blue-50 to-indigo-100 backdrop-blur-md bg-opacity-50">
        <div className="flex items-center justify-between gap-6 mb-8 flex-wrap">
          <div className="flex-grow sm:w-full md:w-3/4">
            <SearchBar
              products={products}
              setFilteredProducts={setFilteredProducts}
              cartItems={cartItems} // Pass cartItems to SearchBar
            />
          </div>
          <div className="sm:w-full md:w-auto">
            <FilterComponent />
          </div>
        </div>
        {/* Filtered Products */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center text-xl text-gray-500">
              No products found for this filter.
            </div>
          ) : (
            filteredProducts
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  handleAddToCart={handleAddToCart}
                  handleRemoveFromCart={handleRemoveFromCart}
                  handleAddToWishlist={handleAddToWishlist}
                  handleRemoveFromWishlist={handleRemoveFromWishlist}
                  isProductInWishlist={isProductInWishlist}
                  isProductInCart={isProductInCart}
                />
              ))
          )}
        </ul>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalItems={filteredProducts.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();
    return { props: { initialProducts: products } };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { props: { initialProducts: [] } };
  }
};

export default Home;
