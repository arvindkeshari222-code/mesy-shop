"use client";
import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface ProductRowSectionProps {
  title: string;
  slug: string;
  products: any[];
}

// 1:1 Exact BestSellers Card Twin layout framing
const RowProductCard = ({ p }: { p: any }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    // Mobile center viewport detection for continuous grayscale-to-color toggle on scroll
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

  // Server-safe regex HTML decoder to wipe clean any raw web data formats securely
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
      className="min-w-[260px] sm:min-w-[320px] max-w-[320px] flex flex-col group/item text-left"
    >
      {/* 👑 B/W IMAGE HOVER ENGINE: Flat background, transitions beautifully to color on mouse hover/mobile scroll */}
      <Link href={`/product/${p.id}`} className="relative aspect-[3/4] bg-white overflow-hidden mb-4 border border-neutral-100 block">
        <img 
          src={p.images?.[0]?.src || 'https://via.placeholder.com/600'} 
          alt={p.name}
          className={`w-full h-full object-cover object-center scale-100 group-hover/item:scale-[1.02] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] mix-blend-multiply ${
            isIntersecting 
              ? 'grayscale-0 md:grayscale group-hover/item:grayscale-0' 
              : 'grayscale md:grayscale group-hover/item:grayscale-0'
          }`}
        />
        
        {p.on_sale && (
          <span className="absolute top-3 left-3 bg-black text-white text-[8px] font-black px-2.5 py-1 uppercase tracking-[2px] rounded-[1px] z-20">
            SALE
          </span>
        )}

        <div className="absolute bottom-0 left-0 w-full p-3 translate-y-full group-hover/item:translate-y-0 transition-transform duration-300 ease-out bg-white/90 backdrop-blur-xs border-t border-neutral-200 hidden sm:block z-20">
          <span className="text-[9px] font-black tracking-[2px] text-black block text-center uppercase">
            Quick View +
          </span>
        </div>
      </Link>

      {/* MINIMALIST TYPOGRAPHY SPECS */}
      <div className="space-y-1.5 px-1">
        <Link href={`/product/${p.id}`} className="block">
          <h3 className="text-[11px] font-bold uppercase tracking-[2px] text-neutral-400 group-hover/item:text-black transition-colors line-clamp-1">
            {safeDecodeHtml(p.name)}
          </h3>
        </Link>
        
        <div className="flex items-baseline gap-2">
          <span className="text-xs font-bold text-black tracking-wide">
            ${parseFloat(p.price || "0").toFixed(2)}
          </span>
          {p.regular_price && p.regular_price !== p.price && (
            <span className="text-[10px] text-neutral-300 line-through font-medium">
              ${parseFloat(p.regular_price).toFixed(2)}
            </span>
          )}
        </div>
      </div>

      <Link 
        href={`/product/${p.id}`}
        className="group/btn relative mt-4 w-full py-4 bg-white text-black border border-black text-center text-[9px] font-black uppercase tracking-[3px] rounded-none overflow-hidden transition-all duration-500 shadow-sm"
      >
        <span className="relative z-10 transition-colors duration-500 group-hover/btn:text-white">
          Acquire Now
        </span>
        <div className="absolute inset-0 bg-black scale-y-0 group-hover/btn:scale-y-100 origin-bottom transition-transform duration-300 ease-out z-0" />
      </Link>
    </div>
  );
};

const ProductRowSection: React.FC<ProductRowSectionProps> = ({ title, slug, products = [] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    // 🎯 STRETCHED LAYOUT: Edge-to-edge frame configuration to blend seamless into your page setup
    <section className="w-full bg-white py-12 select-none font-sans antialiased group relative">
      
      {/* 👑 SOLID STRAIGHT CLEAN HEADER ROW - (NO ITALICS AT ALL) */}
      <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 text-left">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-black tracking-[4px] text-black uppercase">
            {title}
          </h2>
          <p className="text-[9px] font-bold uppercase tracking-[3px] text-neutral-400">
            THE MESY ATELIER FAVORITES
          </p>
        </div>
        
        <Link 
          href={`/category/${slug}`} 
          className="text-[10px] font-black uppercase tracking-[2px] text-black border-b border-black pb-0.5 self-start sm:self-auto hover:opacity-60 transition-opacity"
        >
          View All Collections
        </Link>
      </div>

      {/* CONTROLS */}
      <button 
        onClick={() => scroll('left')} 
        className="absolute left-0 top-[45%] z-30 w-11 h-11 bg-white border border-neutral-200 flex items-center justify-center rounded-none opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:flex hover:bg-black hover:text-white"
      >
        <ChevronLeft size={16} strokeWidth={1.5} />
      </button>

      <button 
        onClick={() => scroll('right')} 
        className="absolute right-0 top-[45%] z-30 w-11 h-11 bg-white border border-neutral-200 flex items-center justify-center rounded-none opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:flex hover:bg-black hover:text-white"
      >
        <ChevronRight size={16} strokeWidth={1.5} />
      </button>

      {/* HORIZONTAL CAROUSEL ENGINE */}
      <div ref={scrollRef} className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 w-full">
        {products.map((p) => (
          <RowProductCard key={p.id} p={p} />
        ))}
      </div>

    </section>
  );
};

export default ProductRowSection;