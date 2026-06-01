"use client";
import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

interface CategoryCircleProps {
  categories?: any[];
}

const CategoryCard = ({ item, index }: { item: any; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { root: null, rootMargin: "-15% 0px -15% 0px", threshold: 0.6 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const safeDecodeHtml = (str: string) => {
    if (!str) return "";
    return str
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
  };

  return (
    <div ref={cardRef} className="relative block group cursor-pointer w-full text-left">
      <Link href={`/category/${item.slug}`} className="block w-full">
        
        {/* 👑 HIGH WIDTH & HEIGHT: Locked into premium 3:4 portrait blueprint instead of raw squares */}
        <div className="relative aspect-[3/4] bg-white overflow-hidden border border-neutral-100 w-full mb-3">
          <img 
            src={item.image?.src || "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=600&q=80"} 
            className={`w-full h-full object-cover object-center scale-100 group-hover:scale-[1.02] transition-all duration-[1200ms] mix-blend-multiply ${
              isIntersecting ? 'grayscale-0' : 'grayscale md:grayscale group-hover:grayscale-0'
            }`} 
            alt={item.name} 
          />
          <div className="absolute top-3 left-3 z-10">
            <span className="text-[7px] font-black uppercase tracking-[2px] text-neutral-400 bg-white/90 backdrop-blur-xs px-2 py-1 border border-neutral-100">
              {item.count || 0} PIECES
            </span>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
        </div>

        {/* METADATA ACCENT OVERLAY */}
        <div className="px-1 space-y-0.5">
          <h3 className="text-[11px] font-bold uppercase tracking-[2px] text-neutral-400 group-hover:text-black transition-colors line-clamp-1">
            {safeDecodeHtml(item.name)}
          </h3>
          <p className="text-[8px] font-bold uppercase tracking-[3px] text-neutral-300">
            Series // 0{index + 1}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default function CategoryCircle({ categories = [] }: CategoryCircleProps) {
  
  // 🎯 STRICT ATELIER EXCLUDE FILTER
  const cleanCategories = categories.filter(cat => {
    const slug = cat.slug?.toLowerCase() || "";
    const name = cat.name?.toLowerCase() || "";
    return (
      slug !== 'uncategorized' &&
      slug !== 'men' &&
      slug !== 'women' &&
      slug !== 'toys' &&
      slug !== 'toy' &&
      slug !== 'kids' &&
      slug !== 'kid' &&
      slug !== 'kids-men' &&
      slug !== 'desktop' &&
      slug !== 'mobile' &&
      slug !== 'mobiles' &&
      slug !== 'tech-innovation' &&
      !slug.includes('tech') &&
      !slug.includes('sanctuary') &&
      !name.includes('sanctuary') &&
      !name.includes('home')
    );
  });

  // 🎯 FIXED PREMIUM 6-CARD EXTRACTION
  const displayCategories = cleanCategories.slice(0, 6);

  if (displayCategories.length === 0) return null;

  return (
    <section className="w-full bg-white py-16 px-4 md:px-8 lg:px-12 select-none font-sans antialiased relative z-30 border-b border-neutral-100">
      <div className="w-full">
        
        {/* SOLID STRAIGHT LUXURY HEADER */}
        <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 text-left">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black tracking-[4px] text-black uppercase">
              SHOP BY ROOM & COLLECTIONS
            </h2>
            <p className="text-[9px] font-bold uppercase tracking-[3px] text-neutral-400">
              CURATED SPACES & ARCHITECTURAL EDITS
            </p>
          </div>
          
          <Link 
            href="/categories" 
            className="text-[10px] font-black uppercase tracking-[2px] text-black border-b border-black pb-0.5 self-start sm:self-auto hover:opacity-60 transition-opacity"
          >
            View All Spaces
          </Link>
        </div>

        {/* HIGH-END 6 COLUMN RECTANGLE MATRIX GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 w-full">
          {displayCategories.map((item, i) => (
            <CategoryCard key={item.id} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}