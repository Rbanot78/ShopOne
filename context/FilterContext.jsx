import { createContext, useContext, useState, useEffect } from 'react';
import { fetchCategories } from '@/api/products';

const FilterContext = createContext(undefined);

export const FilterProvider = ({ children }) => {
  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorLoadingCategories, setErrorLoadingCategories] = useState(null);

  // Cart and wishlist state
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch categories and initialize localStorage data
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        setErrorLoadingCategories(`Error: ${error.message || "Unknown error"}`);
        console.error('Error loading categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();

    // Load cart and wishlist data from localStorage
    setCartItems(JSON.parse(localStorage.getItem('cartItems')) || []);
    setWishlistItems(JSON.parse(localStorage.getItem('wishlistItems')) || []);
  }, []);

  // Update localStorage whenever cart or wishlist changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [cartItems, wishlistItems]);

  // Cart functions
  const addToCart = (product) => {
    return new Promise((resolve) => {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === product.id);
        let updatedItems;

        if (existingItem) {
          updatedItems = prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          updatedItems = [...prevItems, { ...product, quantity: 1 }];
        }

        resolve(updatedItems);
        return updatedItems;
      });
    });
  };

  const updateCartItem = (productId, quantity) => {
    if (quantity <= 0) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeCartItem = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Wishlist functions
  const addToWishlist = (product) => {
    setWishlistItems((prevItems) => {
      if (prevItems.find((item) => item.id === product.id)) {
        return prevItems; // Already in wishlist, no need to add
      } else {
        return [...prevItems, product];
      }
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const isProductInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const isProductInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = cartItems.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(cartItems.length / itemsPerPage);

  return (
    <FilterContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        priceRange,
        setPriceRange,
        categories,
        cartItems,
        addToCart,
        updateCartItem,
        removeCartItem,
        total,
        currentPage,
        setCurrentPage,
        totalPages,
        currentItems,
        loadingCategories,
        errorLoadingCategories,
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isProductInWishlist,
        isProductInCart,
        itemsPerPage, // Expose itemsPerPage if needed elsewhere
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
