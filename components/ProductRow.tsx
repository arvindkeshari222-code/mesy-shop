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
        // 🚀 Fetching active published items safely
        const response = await api.get("products", { 
          per_page: 8,
          status: 'publish'
        });

        // Unique filtration override logic to dodge backend duplicates
        const uniqueProducts = response.data.filter(
          (product: any, index: number, self: any[]) =>
            self.findIndex((p) => p.id === product.id) === index
        );

        setProducts(uniqueProducts);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-20 font-serif italic text-gray-400">Loading MESY Archive...</div>;

  if (products.length === 0) return null;

  return (
    <section className="bg-white py-8 px-6 my-6 max-w-[1550px] mx-auto shadow-sm rounded-[32px] border border-gray-50 group">
      
      {/* Luxury Section Header */}
      <div className="flex justify-between items-baseline mb-8 select-none">
        <div className="space-y-1">
          <h2 className="text-3xl font-serif italic text-black">
            Atelier <span className="text-gray-300">Curations</span>
          </h2>
          <p className="text-[10px] font-black uppercase tracking-[3px] text-[#C5A358]">
            Premium Artifacts & Modern Extensions
          </p>
        </div>
        <Link href="/shop" className="text-xs font-bold text-black border-b border-black cursor-pointer hover:text-[#C5A358] hover:border-[#C5A358] transition-all">
          Explore All
        </Link>
      </div>

      {/* Reconfigured Fluid Responsive Grid Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((item: any) => (
          <Link href={`/product/${item.id}`} key={item.id} className="group/item flex flex-col justify-between cursor-pointer">
            <div>
              {/* Premium Floating Aspect Image Box */}
              <div className="bg-[#F9F9FB] aspect-[4/5] rounded-[24px] overflow-hidden mb-4 border border-gray-50 group-hover/item:border-yellow-200 transition-all duration-500 relative">
                <img 
                  src={item.images?.[0]?.src || "https://via.placeholder.com/400"} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110 select-none"
                  alt={item.name}
                />
                {item.on_sale && (
                  <div className="absolute top-4 left-4 bg-black text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                    Sale
                  </div>
                )}
              </div>
              
              {/* Content Matrix Meta */}
              <div className="space-y-1.5 px-1">
                <span className="text-[9px] font-black uppercase tracking-[2px] text-[#C5A358] block">
                  {item.categories?.[0]?.name || "Luxury"}
                </span>
                <h3 className="text-sm font-serif italic text-black line-clamp-1 group-hover/item:text-[#C5A358] transition-colors duration-300">
                  {item.name}
                </h3>
              </div>
            </div>

            {/* 💸 FIXED CURRENCY PRICING MATRIX: Converted from hardcoded rupee to pure global dollar notation */}
            <p className="text-base font-light text-black tracking-tighter mt-2 px-1">
              ${parseFloat(item.price || "0.00").toFixed(2)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductRow;