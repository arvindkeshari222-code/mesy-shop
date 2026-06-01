"use client";
import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

// Custom internal sub-component mapped 1:1 to your BestSellers validation pipeline
const ToyProductCard = ({ item }: { item: any }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    // Native mobile intersection observer engine for fluid color toggle on scroll
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

  const safeDecodeHtml = (str: string) => {
    if (!str) return "";
    return str
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
  };

  const productTitle = item.name || "Atelier Limited Object";
  const productPrice = item.price || "0.00";
  const productImage = item.images?.[0]?.src || item.image || "";

  return (
    <div 
      ref={cardRef}
      className="w-full flex flex-col group/item text-left justify-between"
    >
      <div>
        {/* 👑 IMAGE FILTER ENGINE: mix-blend-multiply clears #eaeded + handles b/w to color interaction shifts */}
        <Link href={`/product/${item.id}`} className="relative aspect-[3/4] bg-white overflow-hidden mb-4 border border-neutral-100 block w-full">
          <img 
            src={productImage || 'https://via.placeholder.com/600'} 
            alt={productTitle}
            className={`w-full h-full object-cover object-center scale-100 group-hover/item:scale-[1.02] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] mix-blend-multiply ${
              isIntersecting 
                ? 'grayscale-0 md:grayscale group-hover/item:grayscale-0' 
                : 'grayscale md:grayscale group-hover/item:grayscale-0'
            }`}
          />
          
          {item.on_sale && (
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

        {/* METADATA BLOCK */}
        <div className="space-y-1.5 px-1">
          <Link href={`/product/${item.id}`} className="block">
            <h3 className="text-[11px] font-bold uppercase tracking-[2px] text-neutral-400 group-hover/item:text-black transition-colors line-clamp-1">
              {safeDecodeHtml(productTitle)}
            </h3>
          </Link>
          
          <div className="flex items-baseline gap-2">
            <span className="text-xs font-bold text-black tracking-wide">
              ${parseFloat(productPrice).toFixed(2)}
            </span>
            {item.regular_price && item.regular_price !== item.price && (
              <span className="text-[10px] text-neutral-300 line-through font-medium">
                ${parseFloat(item.regular_price).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* MATCHING ACTION LINK BUTTON */}
      <Link 
        href={`/product/${item.id}`}
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

const ToysSection = ({ products = [] }: { products: any[] }) => {
  const displayItems = products && products.length > 0 ? products.slice(0, 4) : [];

  return (
    // 🎯 STRETCHED FRAME: Edge-to-edge layout width configuration with clean neutral lines
    <section className="w-full bg-white py-12 select-none font-sans antialiased relative z-30 border-b border-neutral-100">
      <div className="w-full">
        
        {/* 👑 SOLID STRAIGHT LUXURY HEADER (NO ITALICS) */}
        <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 text-left">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black tracking-[4px] text-black uppercase">
              TOYS & COLLECTIBLES
            </h2>
            <p className="text-[9px] font-bold uppercase tracking-[3px] text-neutral-400">
              PREMIUM DESIGNER FIGURES & CURATED ARTIFACTS
            </p>
          </div>
          
          <Link 
            href="/category/toys-collectibles" 
            className="text-[10px] font-black uppercase tracking-[2px] text-black border-b border-black pb-0.5 self-start sm:self-auto hover:opacity-60 transition-opacity"
          >
            View All Collections
          </Link>
        </div>

        {/* VAULT EMPTY STATE GATEWAY */}
        {displayItems.length === 0 ? (
          <div className="w-full py-24 text-center bg-white border border-neutral-100 flex flex-col items-center justify-center">
            <span className="text-[9px] font-black uppercase tracking-[4px] text-neutral-400 italic">
              — LOADING TOYS & COLLECTIBLES VAULT —
            </span>
          </div>
        ) : (
          /* PERFECT FLAT RESPONSE FOUR COLUMN MATRIX GRID */
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full">
            {displayItems.map((item, idx) => (
              <ToyProductCard key={item.id || idx} item={item} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default ToysSection;