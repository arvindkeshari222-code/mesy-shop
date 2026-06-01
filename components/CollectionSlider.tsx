"use client";
import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

interface MiniShowcaseProps {
  categories?: any[];
}

// Custom internal sub-component to handle clean mobile viewport observation for images
const CategoryCard = ({ item, index }: { item: any; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    // Native mobile intersection engine for smooth grayscale inversion on scroll
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "-15% 0px -15% 0px",
        threshold: 0.6,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 🎯 100% SERVER-SAFE DECODE ENGINE: Universally parsed on both Server and Client without breaking DOM
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
    <div
      ref={cardRef}
      className="relative block group cursor-pointer w-full"
    >
      <Link href={`/category/${item.slug}`} className="block w-full h-full">
        {/* 🌌 ASPECT 3:4 SHARP GRID HOUSING - Blends completely with page background */}
        <div className="relative aspect-[3/4] bg-white overflow-hidden border border-neutral-100 w-full">
          
          {/* 👑 IMAGE FILTER ENGINE: mix-blend-multiply wipes #eaeded + triggers Mobile-Scroll/Desktop-Hover color switch */}
          <img 
            src={item.image?.src || "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=600&q=80"} 
            className={`w-full h-full object-cover object-center scale-100 group-hover:scale-[1.02] transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] mix-blend-multiply ${
              isIntersecting 
                ? 'grayscale-0 md:grayscale group-hover:grayscale-0' 
                : 'grayscale md:grayscale group-hover:grayscale-0'
            }`} 
            alt={item.name} 
          />
          
          {/* Subtle elegant top line overlay label instead of cheap floating circles */}
          <div className="absolute top-3 left-3 z-10">
            <span className="text-[7px] font-black uppercase tracking-[2px] text-neutral-400 bg-white/80 backdrop-blur-xs px-2 py-1 border border-neutral-100">
              {item.count || 0} PIECES
            </span>
          </div>

          {/* Clean minimal bottom hover bar indicator */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
        </div>

        {/* HIGH-END MINIMALIST TYPOGRAPHY SPECS */}
        <div className="pt-3 pb-2 px-1 space-y-1 text-left">
          {/* 🎯 FIXED: Handled text capitalization securely using layout layer utility styling (uppercase) */}
          <h3 className="text-[11px] font-bold uppercase tracking-[2.5px] text-neutral-400 group-hover:text-black transition-colors duration-300 line-clamp-1">
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

const MiniShowcase: React.FC<MiniShowcaseProps> = ({ categories = [] }) => {
  
  // Filter out unwanted nodes and extract active components
  const activeCategories = categories
    .filter(cat => cat.slug !== 'uncategorized')
    .slice(0, 6);

  if (activeCategories.length === 0) return null;

  return (
    // 🎯 FIXED: Stripped max-w caps and paddings to stretch 100% full-screen edge-to-edge
    <section className="w-full bg-white py-16 px-4 md:px-8 lg:px-12 select-none font-sans antialiased relative z-30 border-b border-neutral-100">
      <div className="w-full">
        
        {/* SECTION HEADER BLOCK */}
        <div className="w-full text-left mb-10">
          <h2 className="text-xl sm:text-2xl font-black tracking-[4px] text-black uppercase">
            EXPLORE CATEGORIES
          </h2>
          <p className="text-[9px] font-bold uppercase tracking-[3px] text-neutral-400 mt-1">
            CURATED STRUCTURES BY ACTIVITY
          </p>
        </div>

        {/* PERFECT RESPONSIVE FULL LENGTH GRID MATRIX */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 w-full">
          {activeCategories.map((item, i) => (
            <CategoryCard key={item.id} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default MiniShowcase;