"use client";
import React from 'react';

const CategoryCircle = () => {
  const categories = [
    { name: "Living Room", img: "🛋️", discount: "Up to 50% off" },
    { name: "Kitchen", img: "🍳", discount: "Min. 30% off" },
    { name: "Bedroom", img: "🛏️", discount: "Starting ₹999" },
    { name: "Workplace", img: "💻", discount: "Top Rated" },
    { name: "Decor", img: "🏺", discount: "New Styles" },
    { name: "Outdoor", img: "🌿", discount: "Best Sellers" },
    { name: "Storage", img: "📦", discount: "Flat 20% off" },
  ];

  return (
    <section className="bg-white py-10 px-6 my-6 max-w-[1500px] mx-auto shadow-sm rounded-sm overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-[#111]">Shop by Room & Collections</h2>
        <span className="text-sm text-blue-600 font-bold cursor-pointer hover:underline">View all</span>
      </div>

      <div className="flex justify-between items-center gap-4 overflow-x-auto no-scrollbar pb-2">
        {categories.map((cat, i) => (
          <div key={i} className="flex flex-col items-center min-w-[140px] group cursor-pointer">
            {/* Round Image Container */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#F7F8F8] flex items-center justify-center mb-4 border-2 border-transparent group-hover:border-[#C5A358] group-hover:shadow-lg transition-all duration-300 overflow-hidden">
              <span className="text-4xl md:text-5xl group-hover:scale-110 transition-transform duration-500">
                {cat.img}
              </span>
            </div>
            
            {/* Category Info */}
            <div className="text-center">
              <p className="text-sm font-bold text-gray-800 group-hover:text-black">
                {cat.name}
              </p>
              <span className="text-[10px] font-black text-[#CC0C39] uppercase tracking-tighter">
                {cat.discount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryCircle;