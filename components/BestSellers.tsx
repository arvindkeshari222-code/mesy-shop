"use client";
import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { api } from '@/app/lib/woocommerce'; 
import Link from 'next/link';

// Custom Sub-Component for each product card to handle clean mobile viewport observation
const ProductCard = ({ p }: { p: any }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    // Mobile viewport detection framework
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        root: null, // Viewport standard
        rootMargin: "-15% 0px -15% 0px", // Triggers when item enters center active zone of mobile
        threshold: 0.6, // 60% visibility mark
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef}
      className="min-w-[260px] sm:min-w-[320px] max-w-[320px] flex flex-col group/item text-left"
    >
      {/* SHARP ASPECT IMAGE HOUSING */}
      <Link href={`/product/${p.id}`} className="relative aspect-[3/4] bg-neutral-50 overflow-hidden mb-4 border border-neutral-100 block">
        
        {/* 👑 MOBILE AUTO-COLOR + DESKTOP HOVER INVERSION COMBINED ENGINE */}
        <img 
          src={p.images[0]?.src || 'https://via.placeholder.com/600'} 
          alt={p.name}
          className={`w-full h-full object-cover object-center scale-100 group-hover/item:scale-[1.02] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
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

        {/* DYNAMIC PUSH-UP ACTION BUTTON */}
        <div className="absolute bottom-0 left-0 w-full p-3 translate-y-full group-hover/item:translate-y-0 transition-transform duration-300 ease-out bg-white/90 backdrop-blur-xs border-t border-neutral-200 hidden sm:block z-20">
          <span className="text-[9px] font-black tracking-[2px] text-black block text-center uppercase">
            Quick View +
          </span>
        </div>
      </Link>

      {/* HIGH-END TYPOGRAPHY BLOCK */}
      <div className="space-y-1.5 px-1">
        <Link href={`/product/${p.id}`} className="block">
          <h3 className="text-[11px] font-bold uppercase tracking-[2px] text-neutral-400 group-hover/item:text-black transition-colors line-clamp-1">
            {p.name}
          </h3>
        </Link>
        
        <div className="flex items-baseline gap-2">
          <span className="text-xs font-bold text-black tracking-wide">
            ${parseFloat(p.price).toFixed(2)}
          </span>
          {p.regular_price && p.regular_price !== p.price && (
            <span className="text-[10px] text-neutral-300 line-through font-medium">
              ${parseFloat(p.regular_price).toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* INTERACTIVE PURCHASE ACTION LINK */}
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

const BestSellers = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
     const { data } = await api.get("products", {
  per_page: 8,
  status: 'publish',
  orderby: 'date',
  _fields: 'id,name,price,images,on_sale,regular_price' // Bas itna hi mangwao
});

        const uniqueData = data.filter(
          (product: any, index: number, self: any[]) =>
            self.findIndex((p) => p.id === product.id) === index
        );

        setProducts(uniqueData);
      } catch (error) {
        console.error("Error fetching real products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="w-full py-32 text-center bg-white flex flex-col items-center justify-center space-y-3">
        <div className="w-6 h-6 border-2 border-neutral-200 border-t-black rounded-full animate-spin" />
        <span className="text-[9px] font-black uppercase tracking-[3px] text-neutral-400">CURATING ATELIER FAVORITES...</span>
      </div>
    );
  }

  return (
    <section className="w-full bg-white py-20 px-4 md:px-8 lg:px-12 select-none font-sans antialiased group relative border-b border-neutral-100">
      
      {/* HEADER ROW */}
      <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 text-left">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-black tracking-[4px] text-black uppercase">
            BEST SELLERS
          </h2>
          <p className="text-[9px] font-bold uppercase tracking-[3px] text-neutral-400">
            THE MESY ATELIER FAVORITES
          </p>
        </div>
        
        <Link 
          href="/category/best-sellers" 
          className="text-[10px] font-black uppercase tracking-[2px] text-black border-b border-black pb-0.5 self-start sm:self-auto hover:opacity-60 transition-opacity"
        >
          View All Collections
        </Link>
      </div>

      {/* NAVIGATION CONTROLS */}
      <button 
        onClick={() => scroll('left')} 
        className="absolute left-4 top-[50%] z-30 w-11 h-11 bg-white border border-neutral-200 flex items-center justify-center rounded-none opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:flex hover:bg-black hover:text-white"
      >
        <ChevronLeft size={16} strokeWidth={1.5} />
      </button>

      <button 
        onClick={() => scroll('right')} 
        className="absolute right-4 top-[50%] z-30 w-11 h-11 bg-white border border-neutral-200 flex items-center justify-center rounded-none opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:flex hover:bg-black hover:text-white"
      >
        <ChevronRight size={16} strokeWidth={1.5} />
      </button>

      {/* CAROUSEL FLOW SCROLL ENGINE */}
      <div 
        ref={scrollRef} 
        className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 w-full"
      >
        {products.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>

    </section>
  );
};

export default BestSellers;