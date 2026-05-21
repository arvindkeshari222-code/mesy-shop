"use client";
import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { api } from '@/app/lib/woocommerce'; 
import Link from 'next/link'; // 1. Navigation ke liye Link import kiya

const BestSellers = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("products", {
          per_page: 10,
          status: 'publish',
          orderby: 'popularity'
        });
        setProducts(data);
      } catch (error) {
        console.error("Error fetching real products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (loading) return <div className="py-20 text-center font-serif italic text-gray-400">Curating Best Sellers...</div>;

  return (
    <section className="bg-white py-8 px-6 my-6 max-w-[1550px] mx-auto shadow-sm group relative rounded-[32px] border border-gray-50">
      <div className="flex items-baseline justify-between mb-8">
        <div className="space-y-1">
          <h2 className="text-3xl font-serif italic text-black">Best <span className="text-gray-300">Sellers</span></h2>
          <p className="text-[10px] font-black uppercase tracking-[3px] text-[#C5A358]">The MESY Atelier Favorites</p>
        </div>
        <Link href="/shop" className="text-xs font-bold text-black border-b border-black cursor-pointer hover:text-[#C5A358] hover:border-[#C5A358] transition-all">
          View All Collections
        </Link>
      </div>

      <button onClick={() => scroll('left')} className="absolute left-4 top-[45%] z-30 w-10 h-10 bg-white/80 backdrop-blur-md shadow-lg border border-gray-100 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
        <ChevronLeft size={20} />
      </button>

      <button onClick={() => scroll('right')} className="absolute right-4 top-[45%] z-30 w-10 h-10 bg-white/80 backdrop-blur-md shadow-xl border border-gray-100 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
        <ChevronRight size={20} />
      </button>

      <div ref={scrollRef} className="flex gap-8 overflow-x-auto no-scrollbar scroll-smooth pb-6">
        {products.map((p) => (
          /* 2. Pura card ab ek Link hai, click karte hi product page khulega */
          <Link 
            href={`/product/${p.id}`} 
            key={p.id} 
            className="min-w-[280px] max-w-[280px] flex flex-col group/item cursor-pointer"
          >
            <div className="relative aspect-[4/5] bg-[#F9F9FB] rounded-[24px] overflow-hidden mb-4 border border-gray-50 group-hover/item:border-yellow-200 transition-all">
              <img 
                src={p.images[0]?.src || 'https://via.placeholder.com/400'} 
                alt={p.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110"
              />
              {p.on_sale && (
                <div className="absolute top-4 left-4 bg-black text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                  Sale
                </div>
              )}
            </div>

            <div className="space-y-2 px-1">
              <p className="text-sm font-serif italic text-black line-clamp-1 group-hover/item:text-[#C5A358] transition-colors">
                {p.name}
              </p>
              
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} fill={i < 4 ? "#C5A358" : "none"} className={i < 4 ? "text-[#C5A358]" : "text-gray-200"} />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xl font-light text-black tracking-tighter">
                  ${parseFloat(p.price).toFixed(2)}
                </span>
                {p.regular_price && p.regular_price !== p.price && (
                  <span className="text-xs text-gray-400 line-through font-light">
                    ${parseFloat(p.regular_price).toFixed(2)}
                  </span>
                )}
              </div>
              
              <div className="mt-4 w-full py-4 bg-black text-white text-center text-[9px] font-black uppercase tracking-[3px] rounded-full hover:bg-[#C5A358] transition-all duration-500 shadow-xl shadow-black/5">
                Acquire Now
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BestSellers;