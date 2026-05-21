"use client";
import React from 'react';

const BeautySection = () => {
  const beautyDeals = [
    { title: "Luxury Fragrances", discount: "Up to 30% Off", img: "🧴", brand: "MESY Atelier" },
    { title: "Organic Skincare", discount: "Min. 20% Off", img: "🧼", brand: "Pure Essence" },
    { title: "Grooming Kits", discount: "Deal of the Day", img: "🪒", brand: "Elite Edge" },
    { title: "Essential Oils", discount: "New Arrivals", img: "🧪", brand: "Zen Aura" }
  ];

  return (
    <section className="bg-white p-6 my-6 max-w-[1500px] mx-auto shadow-sm rounded-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#111]">Premium Beauty & Personal Care</h2>
          <p className="text-xs text-gray-500 italic">Curated collections for a refined lifestyle</p>
        </div>
        <button className="text-xs font-bold text-[#007185] hover:underline">Explore Luxury Beauty</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {beautyDeals.map((item, idx) => (
          <div key={idx} className="group cursor-pointer">
            <div className="relative aspect-[3/4] bg-[#F9F9F9] rounded-sm overflow-hidden flex items-center justify-center border border-transparent group-hover:border-[#C5A358] transition-all duration-500">
              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <span className="text-7xl group-hover:scale-110 transition-transform duration-700 z-10">
                {item.img}
              </span>

              {/* Discount Tag */}
              <div className="absolute top-3 left-3 bg-black text-white text-[10px] font-black px-2 py-1 uppercase tracking-tighter">
                {item.discount}
              </div>
            </div>
            
            <div className="mt-3 space-y-1">
              <p className="text-[10px] font-bold text-[#C5A358] uppercase tracking-widest">{item.brand}</p>
              <h3 className="text-sm font-medium text-gray-800 group-hover:text-black transition-colors">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BeautySection;