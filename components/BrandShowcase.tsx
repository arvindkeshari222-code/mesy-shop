"use client";
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const BrandShowcase = () => {
  const categories = [
    {
      name: "MESY Tech",
      desc: "Tech & Innovation Elite",
      link: "/category/tech-innovation",
      bgClass: "bg-gradient-to-br from-[#111] via-[#161618] to-[#222]",
      textColor: "text-white",
      badge: "Mobile Suite & Audio"
    },
    {
      name: "Atelier Home",
      desc: "Handcrafted Luxury Living",
      link: "/category/home-sanctuary",
      bgClass: "bg-gradient-to-br from-[#F5F5F7] to-[#E8E8ED]",
      textColor: "text-black",
      badge: "Decor & Aura Lighting"
    }
  ];

  return (
    <section className="max-w-[1550px] mx-auto px-1 md:px-0 my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat, idx) => (
          <Link
            href={cat.link}
            key={idx}
            className={`${cat.bgClass} h-[450px] md:h-[500px] rounded-[32px] relative overflow-hidden group cursor-pointer flex flex-col items-center justify-center text-center p-12 shadow-sm border border-gray-100/10 transition-transform duration-500 hover:scale-[1.01]`}
          >
            {/* Background Big Typography Text Effect */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 opacity-[0.03] md:opacity-[0.05] select-none pointer-events-none w-full">
              <span className={`text-[8rem] md:text-[12rem] font-black uppercase tracking-tighter block text-center ${cat.textColor}`}>
                {cat.name.split(' ')[0]}
              </span>
            </div>

            {/* Content Container */}
            <div className="relative z-10 space-y-6 flex flex-col items-center">
              <span className={`inline-block text-[9px] font-black uppercase tracking-[4px] px-4 py-1.5 border rounded-full backdrop-blur-md ${cat.textColor === 'text-white' ? 'border-white/20 text-white/80 bg-white/5' : 'border-black/10 text-black/70 bg-black/5'}`}>
                {cat.badge}
              </span>
              
              <h3 className={`text-4xl md:text-6xl font-serif italic ${cat.textColor} tracking-tight drop-shadow-sm`}>
                {cat.name}
              </h3>
              
              <p className={`text-xs md:text-sm tracking-[5px] uppercase font-bold opacity-60 max-w-sm ${cat.textColor}`}>
                {cat.desc}
              </p>
              
              <div className={`mt-6 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[3px] border-b pb-2 transition-all duration-300 group-hover:gap-4 ${cat.textColor === 'text-white' ? 'border-white/40 text-white hover:border-white' : 'border-black/20 text-black hover:border-black'}`}>
                <span>Discover Collection</span>
                <ArrowRight size={14} strokeWidth={2.5} />
              </div>
            </div>

            {/* Decorative Corner Luxury Light Effect */}
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-white/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#C5A358]/10 transition-all duration-700" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BrandShowcase;