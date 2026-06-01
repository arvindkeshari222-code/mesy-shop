"use client";
import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// Custom internal sub-component to handle clean mobile viewport observation for images
const SeasonalCard = ({ product, idx }: { product: any; idx: number }) => {
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

  const productTitle = product.name || "Atelier Signature Piece";
  const productPrice = product.price || "0.00";
  const productImage = product.images?.[0]?.src || "";
  const archiveTag = product.sku ? `EDITION // ${product.sku}` : "EXCLUSIVE EDIT";

  return (
    <div 
      ref={cardRef} 
      className="group/item cursor-pointer flex flex-col bg-white text-left min-w-[260px] sm:min-w-[320px] max-w-[320px] snap-start shrink-0"
    >
      <Link href={`/product/${product.id}`} className="flex flex-col flex-1">
        
        {/* 🌌 ASPECT 3:4 SHARP IMAGE HOUSING - Blends completely into page background */}
        <div className="relative aspect-[3/4] bg-white overflow-hidden mb-4 border border-neutral-100 block w-full">
          {productImage ? (
            <img 
              src={productImage} 
              className={`w-full h-full object-cover object-center scale-100 group-hover/item:scale-[1.02] transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] mix-blend-multiply ${
                isIntersecting 
                  ? 'grayscale-0 md:grayscale group-hover/item:grayscale-0' 
                  : 'grayscale md:grayscale group-hover/item:grayscale-0'
              }`} 
              alt={productTitle} 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[8px] font-bold text-neutral-300 uppercase tracking-widest">
              No Finish Loaded
            </div>
          )}
          
          <div className="absolute top-3 left-3 bg-black text-white text-[7px] font-black px-2.5 py-1 uppercase tracking-[2px] rounded-[1px] z-20">
            {archiveTag}
          </div>

          {/* Clean minimal quick view push-up bar */}
          <div className="absolute bottom-0 left-0 w-full p-3 translate-y-full group-hover/item:translate-y-0 transition-transform duration-300 ease-out bg-white/90 backdrop-blur-xs border-t border-neutral-200 hidden sm:block z-20">
            <span className="text-[9px] font-black tracking-[2px] text-black block text-center uppercase">
              Quick View +
            </span>
          </div>
        </div>

        {/* HIGH-END TYPOGRAPHY SPECS */}
        <div className="space-y-1.5 px-1 flex-1">
          <p className="text-[8px] font-bold text-[#C5A358] uppercase tracking-[3px]">
            {product.brands?.[0]?.name || "THE SUMMER EDIT"}
          </p>
          
          <h3 className="text-[11px] font-bold uppercase tracking-[2px] text-neutral-400 group-hover/item:text-black transition-colors duration-300 line-clamp-1">
            {productTitle}
          </h3>
          
          <div className="flex items-baseline gap-2 pt-1 border-t border-neutral-100 mt-2">
            <span className="text-xs font-bold text-black tracking-wide">
              ${parseFloat(productPrice).toFixed(2)}
            </span>
          </div>
        </div>

      </Link>

      {/* FULL INVERSION ULTRA-LUXURY CTA ACTION */}
      <Link href={`/product/${product.id}`} className="mt-4">
        <button className="group/btn relative w-full py-4 bg-white text-black border border-black text-center text-[9px] font-black uppercase tracking-[3px] rounded-none overflow-hidden transition-all duration-500 shadow-sm">
          <span className="relative z-10 transition-colors duration-500 group-hover/btn:text-white">
            View Details
          </span>
          <div className="absolute inset-0 bg-black scale-y-0 group-hover/btn:scale-y-100 origin-bottom transition-transform duration-300 ease-out z-0" />
        </button>
      </Link>

    </div>
  );
};

const SeasonalTrends = ({ products = [] }: { products: any[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.85;
      
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    // 🎯 FIXED: Removed max-w caps and strict capsule layouts to stretch 100% full-screen edge-to-edge
    <section className="w-full bg-white py-20 px-4 md:px-8 lg:px-12 select-none font-sans antialiased group relative border-b border-neutral-100">
      
      {/* HEADER ROW */}
      <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 text-left">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-black tracking-[4px] text-black uppercase">
            THE SUMMER EDIT
          </h2>
          <p className="text-[9px] font-bold uppercase tracking-[3px] text-neutral-400">
            ATELIER SEASONAL CAROUSEL STREAM
          </p>
        </div>

        {/* CONTROLLERS BUTTONS ROW */}
        {products && products.length > 0 && (
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button 
              onClick={() => handleScroll('left')}
              type="button" 
              className="w-11 h-11 bg-white border border-neutral-200 flex items-center justify-center rounded-none transition-all duration-300 hover:bg-black hover:text-white"
            >
              <ChevronLeft size={16} strokeWidth={1.5} />
            </button>
            <button 
              onClick={() => handleScroll('right')}
              type="button" 
              className="w-11 h-11 bg-white border border-neutral-200 flex items-center justify-center rounded-none transition-all duration-300 hover:bg-black hover:text-white"
            >
              <ChevronRight size={16} strokeWidth={1.5} />
            </button>
          </div>
        )}
      </div>

      {/* MATRIX VIEW VALIDATION */}
      {!products || products.length === 0 ? (
        <div className="w-full py-24 text-center bg-white border border-neutral-100 flex flex-col items-center justify-center">
          <span className="text-[9px] font-black uppercase tracking-[4px] text-neutral-400 italic">
            — SUMMER COLLECTION CHANNEL CURRENTY EMPTY —
          </span>
        </div>
      ) : (
        /* Horizontal Scroll Container (With custom no-scrollbar setup) */
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 sm:gap-6 bg-white no-scrollbar snap-x snap-mandatory scroll-smooth pb-4 w-full"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {products.map((product: any, idx: number) => (
            <SeasonalCard key={product.id || idx} product={product} idx={idx} />
          ))}
        </div>
      )}

    </section>
  );
};

export default SeasonalTrends;