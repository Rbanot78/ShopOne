import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import Image from 'next/image';
import Link from 'next/link';
import { fetchProducts } from '@/api/products';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ProductSlider = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="product-slider mt-12 px-4 sm:px-6 lg:px-8">
    
      <Swiper
        spaceBetween={20}
        navigation
        loop={true}
        centeredSlides={true}
        modules={[Navigation]}
        className="w-full max-w-7xl mx-auto"
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <Link href={`/product/${product.id}`} passHref>
              <motion.div
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                {/* Product Image with hover effect */}
                <div className="relative w-full h-48 sm:h-56 md:h-72 overflow-hidden rounded-t-2xl">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full transition-all duration-300 ease-in-out hover:scale-110"
                  />
                </div>

                {/* Product Info */}
                <div className="p-4 text-center">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
                    {product.title.length > 20
                      ? `${product.title.substring(0, 20)}...`
                      : product.title}
                  </h3>
                  <p className="text-lg text-blue-600 mt-2 font-medium">${product.price}</p>
                  <div className="mt-4 flex justify-center items-center gap-2">
                    <span className="px-3 py-1 text-sm text-white bg-blue-500 rounded-lg">
                      {product.category}
                    </span>
                  </div>

                  {/* Action Icons */}
                  <div className="mt-4 flex justify-center gap-4 text-gray-600">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="p-2 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300"
                    >
                      <FaShoppingCart size={20} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="p-2 bg-gray-200 rounded-full text-red-500 hover:bg-gray-300"
                    >
                      <FaHeart size={20} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
