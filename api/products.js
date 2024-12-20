// Fetch products from API
export const fetchProducts = async () => {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Fetch product details by ID from API
export const fetchProductById = async (id) => {
  if (!id) return null;

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) {
      throw new Error('Product not found');
    }
    const product = await res.json();
    return product;
  } catch (error) {
    console.error('Error fetching product by id:', error);
    return null;
  }
};

// Fetch categories from API
export const fetchCategories = async () => {
  try {
    const res = await fetch('https://fakestoreapi.com/products/categories');
    if (!res.ok) {
      throw new Error('Failed to fetch categories');
    }
    const categories = await res.json();
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Fetch products by category from API
export const fetchProductsByCategory = async (category) => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    if (!res.ok) {
      throw new Error('Failed to fetch products by category');
    }
    const products = await res.json();
    return products;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
};

// Fetch products by card from API
export const fetchCart = async () => {
  try {
    const res = await fetch('https://fakestoreapi.com/carts');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching cart data:', error);
    return [];
  }
};
