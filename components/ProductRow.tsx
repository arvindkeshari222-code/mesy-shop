// components/ProductRow.tsx (Ensure it stays LIVE)
"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '../app/lib/woocommerce';

const ProductRow = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Latest 8 products including your new Massager
        const response = await api.get("products", { per_page: 8 });
        setProducts(response.data);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-10 italic">Loading MESY Archive...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((item: any) => (
        <Link href={`/product/${item.id}`} key={item.id} className="group">
          <div className="bg-white p-5 rounded-3xl border border-gray-100 hover:shadow-2xl transition-all duration-700">
            <div className="h-64 bg-[#f9f9f9] rounded-2xl overflow-hidden mb-6">
              <img 
                src={item.images?.[0]?.src || "https://via.placeholder.com/400"} 
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000"
                alt={item.name}
              />
            </div>
            <span className="text-[10px] uppercase tracking-[2px] text-gray-400 font-medium">
              {item.categories?.[0]?.name || "Luxury"}
            </span>
            <h3 className="text-lg font-serif italic text-black truncate">{item.name}</h3>
            <p className="text-black font-medium mt-1">₹{item.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductRow;