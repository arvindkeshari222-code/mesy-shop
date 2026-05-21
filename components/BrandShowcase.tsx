"use client";
import React from 'react';
import { ArrowRight } from 'lucide-react';

const BrandShowcase = () => {
  const brands = [
    {
      name: "MESY Tech",
      desc: "Future of Workspace",
      img: "💻",
      color: "bg-[#161618]",
      textColor: "text-white"
    },
    {
      name: "Atelier Home",
      desc: "Handcrafted Luxury",
      img: "🏺",
      color: "bg-[#F5F5F7]",
      textColor: "text-black"
    }
  ];

  return (
    <section className="max-w-[1500px] mx-auto px-1 md:px-0 my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {brands.map((brand, idx) => (
          <div 
            key={idx} 
            className={`${brand.color} h-[500px] rounded-sm relative overflow-hidden group cursor-pointer flex flex-col items-center justify-center text-center p-12`}
          >
            {/* Background Text Effect */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-10 select-none">
              <span className={`text-9xl font-black tracking-tighter ${brand.textColor}`}>
                {brand.name.split(' ')[0]}
              </span>
            </div>

            {/* Content */}
            <div className="relative z-10 space-y-4">
              <h3 className={`text-4xl md:text-6xl font-serif italic ${brand.textColor}`}>
                {brand.name}
              </h3>
              <p className={`text-sm tracking-[4px] uppercase font-bold opacity-70 ${brand.textColor}`}>
                {brand.desc}
              </p>
              
              <div className={`mt-8 flex items-center justify-center gap-2 text-sm font-bold border-b-2 pb-1 transition-all group-hover:gap-4 ${brand.textColor === 'text-white' ? 'border-white' : 'border-black'}`}>
                <span>Discover Collection</span>
                <ArrowRight size={16} />
              </div>
            </div>

            {/* Large Floating Icon/Image Placeholder */}
            <div className="absolute bottom-[-20px] right-[-20px] text-[15rem] opacity-20 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700">
              {brand.img}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandShowcase;