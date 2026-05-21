import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';

// Sample Data (Baad mein ye WooCommerce API se aayega)
const products = [
  { id: 1, name: "Premium Wireless Earbuds", price: 49.99, rating: 4.8, reviews: 124, image: "https://via.placeholder.com/300" },
  { id: 2, name: "Smart Home Security Camera", price: 89.00, rating: 4.5, reviews: 89, image: "https://via.placeholder.com/300" },
  { id: 3, name: "Minimalist Leather Watch", price: 120.00, rating: 4.9, reviews: 210, image: "https://via.placeholder.com/300" },
  { id: 4, name: "Portable Power Bank 20k", price: 35.50, rating: 4.7, reviews: 56, image: "https://via.placeholder.com/300" },
];

const ProductGrid: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-8 text-gray-800">Featured Collections</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded">
                NEW
              </div>
            </div>

            {/* Details */}
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 h-10">
                {product.name}
              </h3>
              
              {/* Ratings */}
              <div className="flex items-center mt-2 gap-1">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                  ))}
                </div>
                <span className="text-xs text-gray-500">({product.reviews})</span>
              </div>

              {/* Price & Action */}
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 block leading-none">Price</span>
                  <span className="text-xl font-bold text-gray-900">${product.price}</span>
                </div>
                <button className="bg-[#0f1111] hover:bg-blue-600 text-white p-2.5 rounded-full transition-all shadow-lg active:scale-95">
                  <ShoppingCart size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;