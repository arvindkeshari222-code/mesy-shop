"use client";
import React from 'react';
import Link from 'next/link';

interface BeautySectionProps {
  products: any[];
  title?: string;
}

const BeautySection: React.FC<BeautySectionProps> = ({ products = [], title = "Mindful Care & Wellness" }) => {
  
  // Agar backend se data fetch na ho paye ya loading ho, toh safety filter
  if (!products || products.length === 0) {
    return (
      <div className="py-12 text-center font-serif italic text-gray-400">
        Curating Luxury Wellness...
      </div>
    );
  }

  // Sirf pehle 4 unique products dikhayenge grid mein ekdum balanced design ke liye
  const displayProducts = products.slice(0, 4);

  return (
    <section className="bg-white py-8 px-6 my-6 max-w-[1550px] mx-auto shadow-sm rounded-[32px] border border-gray-50 group">
      <div className="flex items-baseline justify-between mb-8">
        <div className="space-y-1">
          <h2 className="text-3xl font-serif italic text-black">
            {title.split(' ')[0]} <span className="text-gray-300">{title.split(' ').slice(1).join(' ')}</span>
          </h2>
          <p className="text-[10px] font-black uppercase tracking-[3px] text-[#C5A358]">
            WELLNESS & BODY ATELIER
          </p>
        </div>
        <Link href="/category/mindful-care" className="text-xs font-bold text-black border-b border-black cursor-pointer hover:text-[#C5A358] hover:border-[#C5A358] transition-all">
          Explore Wellness
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {displayProducts.map((p) => (
          <Link 
            href={`/product/${p.id}`} 
            key={p.id} 
            className="group/item flex flex-col cursor-pointer"
          >
            <div className="relative aspect-[4/5] bg-[#F9F9FB] rounded-[24px] overflow-hidden mb-4 border border-gray-50 group-hover/item:border-yellow-200 transition-all duration-500">
              {/* Real Product Image */}
              <img 
                src={p.images[0]?.src || 'https://via.placeholder.com/400'} 
                alt={p.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110"
              />

              {/* Real Sale Tag */}
              {p.on_sale && (
                <div className="absolute top-4 left-4 bg-black text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                  Sale
                </div>
              )}
            </div>
            
            <div className="space-y-2 px-1">
              <p className="text-[10px] font-bold text-[#C5A358] uppercase tracking-widest">
                {p.brands?.[0]?.name || "MESY ATELIER"}
              </p>
              <h3 className="text-sm font-serif italic text-black line-clamp-1 group-hover/item:text-[#C5A358] transition-colors">
                {p.name}
              </h3>

              {/* 💸 Dollar Pricing Filter */}
              <div className="flex items-center gap-2">
                <span className="text-base font-light text-black tracking-tighter">
                  ${parseFloat(p.price).toFixed(2)}
                </span>
                {p.regular_price && p.regular_price !== p.price && (
                  <span className="text-xs text-gray-400 line-through font-light">
                    ${parseFloat(p.regular_price).toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BeautySection;